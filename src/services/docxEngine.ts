/**
 * DOCX Template & Placeholder Processing Engine
 * Supports {{placeholder}} detection, form field mapping,
 * and document rendering using PizZip and Docxtemplater.
 */

import PizZip from 'pizzip';
import Docxtemplater from 'docxtemplater';
import { LetterTemplateField, FieldDataType } from '../types';

export interface PlaceholderInspection {
  rawPlaceholders: string[];
  fields: LetterTemplateField[];
  errors: string[];
}

/**
 * Extract all {{placeholder}} patterns from text or docx xml content
 */
export function extractPlaceholdersFromText(text: string): string[] {
  const regex = /\{\{([a-zA-Z0-9_]+)\}\}/g;
  const matches = new Set<string>();
  let match;
  while ((match = regex.exec(text)) !== null) {
    matches.add(`{{${match[1]}}}`);
  }
  return Array.from(matches);
}

/**
 * Infer human-friendly label and input type from placeholder key
 */
export function inferFieldFromPlaceholder(placeholder: string): LetterTemplateField {
  const key = placeholder.replace(/[{}]/g, '').toLowerCase();

  let label = key
    .split('_')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');

  let dataType: FieldDataType = 'text';
  let required = true;
  let isSensitive = false;
  let options: string[] | undefined = undefined;
  let helpText: string | undefined = undefined;
  let placeholderText: string | undefined = undefined;

  if (key === 'nik' || key.includes('no_ktp')) {
    label = 'Nomor Induk Kependudukan (NIK)';
    dataType = 'text';
    isSensitive = true;
    helpText = '16 digit angka NIK sesuai KTP / KK';
    placeholderText = '360214...';
  } else if (key === 'nama' || key === 'nama_lengkap') {
    label = 'Nama Lengkap';
    placeholderText = 'Sesuai dengan KTP';
  } else if (key === 'jenis_kelamin' || key === 'jk') {
    label = 'Jenis Kelamin';
    dataType = 'select';
    options = ['Laki-laki', 'Perempuan'];
  } else if (key === 'agama') {
    label = 'Agama';
    dataType = 'select';
    options = ['Islam', 'Kristen', 'Katolik', 'Hindu', 'Buddha', 'Konghucu'];
  } else if (key === 'status_kawin' || key === 'status_perkawinan') {
    label = 'Status Perkawinan';
    dataType = 'select';
    options = ['Belum Kawin', 'Kawin', 'Cerai Hidup', 'Cerai Mati'];
  } else if (key.includes('alamat')) {
    label = label.includes('Usaha') ? 'Alamat Usaha' : 'Alamat Tempat Tinggal';
    dataType = 'textarea';
    placeholderText = 'RT / RW, Kampung/Dusun, Desa Girimukti';
  } else if (key.includes('tanggal') || key.includes('tgl')) {
    dataType = 'text';
    placeholderText = 'Contoh: Lebak, 15 Mei 1990';
  } else if (key.includes('pekerjaan')) {
    label = 'Pekerjaan';
    placeholderText = 'Wiraswasta / Petani / Karyawan';
  } else if (key === 'nomor_surat' || key === 'tanggal_surat' || key === 'jabatan_penandatangan' || key === 'nama_penandatangan') {
    // System placeholders that will be filled automatically by village operator
    required = false;
    helpText = 'Diisi otomatis oleh sistem saat penerbitan surat';
  }

  return {
    placeholder,
    label,
    dataType,
    required,
    isSensitive,
    options,
    helpText,
    placeholderText
  };
}

/**
 * Inspect an uploaded ArrayBuffer of a .docx file and extract placeholders
 */
export async function inspectDocxBuffer(buffer: ArrayBuffer): Promise<PlaceholderInspection> {
  const errors: string[] = [];
  try {
    const zip = new PizZip(buffer);
    const doc = new Docxtemplater(zip, {
      paragraphLoop: true,
      linebreaks: true,
      delimiters: { start: '{{', end: '}}' }
    });

    const fullText = doc.getFullText();
    const rawPlaceholders = extractPlaceholdersFromText(fullText);

    // Filter out system placeholders from user-fillable form fields
    const systemKeys = ['{{nomor_surat}}', '{{tanggal_surat}}', '{{jabatan_penandatangan}}', '{{nama_penandatangan}}'];
    const userPlaceholders = rawPlaceholders.filter(p => !systemKeys.includes(p));

    const fields = userPlaceholders.map(inferFieldFromPlaceholder);

    return {
      rawPlaceholders,
      fields,
      errors
    };
  } catch (err: any) {
    errors.push(`Gagal membaca struktur DOCX: ${err.message || 'File tidak valid'}`);
    return {
      rawPlaceholders: [],
      fields: [],
      errors
    };
  }
}

/**
 * Render a populated DOCX buffer from a template text or buffer
 */
export function renderPopulatedText(
  templateText: string,
  data: Record<string, string>,
  systemData: {
    nomorSurat: string;
    tanggalSurat: string;
    jabatanPenandatangan: string;
    namaPenandatangan: string;
  }
): string {
  let output = templateText;
  
  // Replace system variables
  output = output.replace(/\{\{nomor_surat\}\}/g, systemData.nomorSurat);
  output = output.replace(/\{\{tanggal_surat\}\}/g, systemData.tanggalSurat);
  output = output.replace(/\{\{jabatan_penandatangan\}\}/g, systemData.jabatanPenandatangan);
  output = output.replace(/\{\{nama_penandatangan\}\}/g, systemData.namaPenandatangan);

  // Replace form variables
  Object.entries(data).forEach(([key, val]) => {
    const cleanKey = key.startsWith('{{') ? key : `{{${key}}}`;
    const escapedKey = cleanKey.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');
    output = output.replace(new RegExp(escapedKey, 'g'), val || '-');
  });

  return output;
}

/**
 * Generate a downloadable .docx file blob using client-side XML packaging
 */
export function generateDocxBlob(
  title: string,
  content: string,
  docNumber: string,
  verificationUrl: string
): Blob {
  // Generate a standard OpenXML / WordprocessingML package compatible with MS Word & LibreOffice
  const documentXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
  <w:body>
    <w:p>
      <w:pPr><w:jc w:val="center"/></w:pPr>
      <w:r><w:rPr><w:b/><w:sz w:val="28"/></w:rPr><w:t>PEMERINTAH KABUPATEN LEBAK</w:t></w:r>
    </w:p>
    <w:p>
      <w:pPr><w:jc w:val="center"/></w:pPr>
      <w:r><w:rPr><w:b/><w:sz w:val="28"/></w:rPr><w:t>KECAMATAN CIMARGA</w:t></w:r>
    </w:p>
    <w:p>
      <w:pPr><w:jc w:val="center"/></w:pPr>
      <w:r><w:rPr><w:b/><w:sz w:val="32"/></w:rPr><w:t>KANTOR KEPALA DESA GIRIMUKTI</w:t></w:r>
    </w:p>
    <w:p>
      <w:pPr><w:jc w:val="center"/><w:pBdr><w:bottom w:val="single" w:sz="18" w:space="4" w:color="0B3D6E"/></w:pBdr></w:pPr>
      <w:r><w:rPr><w:sz w:val="20"/><w:i/></w:rPr><w:t>Jl. Raya Cimarga - Leuwidamar Km. 4, Girimukti 42361 | Email: pemdes.girimukti@lebakkab.go.id</w:t></w:r>
    </w:p>
    <w:p/>
    ${content
      .split('\n')
      .map(line => {
        const isHeader = line.includes('SURAT KETERANGAN') || line.includes('Nomor:');
        return `<w:p>
          <w:pPr>${isHeader ? '<w:jc w:val="center"/>' : ''}</w:pPr>
          <w:r><w:rPr>${isHeader ? '<w:b/>' : ''}<w:sz w:val="24"/></w:rPr><w:t>${escapeXml(line)}</w:t></w:r>
        </w:p>`;
      })
      .join('\n')}
    <w:p/>
    <w:p>
      <w:r><w:rPr><w:i/><w:sz w:val="18"/><w:color w:val="64748B"/></w:rPr><w:t>Dokumen ini diterbitkan secara sah oleh Pemerintah Desa Girimukti. Verifikasi keaslian dapat dicek melalui tautan resmi: ${escapeXml(verificationUrl)}</w:t></w:r>
    </w:p>
  </w:body>
</w:document>`;

  const zip = new PizZip();
  zip.file('_rels/.rels', `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/>
</Relationships>`);

  zip.file('word/_rels/document.xml.rels', `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"/>`);

  zip.file('[Content_Types].xml', `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
  <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
  <Default Extension="xml" ContentType="application/xml"/>
  <Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/>
</Types>`);

  zip.file('word/document.xml', documentXml);

  return zip.generate({
    type: 'blob',
    mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  });
}

function escapeXml(unsafe: string): string {
  return unsafe.replace(/[<>&'"]/g, c => {
    switch (c) {
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '&': return '&amp;';
      case '\'': return '&apos;';
      case '"': return '&quot;';
      default: return c;
    }
  });
}
