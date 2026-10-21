const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const workDir = path.join(__dirname, 'docx_temp');
const wordDir = path.join(workDir, 'word');
const relsDir = path.join(workDir, '_rels');
const wordRelsDir = path.join(wordDir, '_rels');

// Clean & create directories
if (fs.existsSync(workDir)) {
    fs.rmSync(workDir, { recursive: true, force: true });
}
fs.mkdirSync(wordRelsDir, { recursive: true });
fs.mkdirSync(relsDir, { recursive: true });

// 1. [Content_Types].xml
const contentTypesXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
  <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
  <Default Extension="xml" ContentType="application/xml"/>
  <Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/>
  <Override PartName="/word/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml"/>
</Types>`;
fs.writeFileSync(path.join(workDir, '[Content_Types].xml'), contentTypesXml, 'utf8');

// 2. _rels/.rels
const relsXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/>
</Relationships>`;
fs.writeFileSync(path.join(relsDir, '.rels'), relsXml, 'utf8');

// 3. word/_rels/document.xml.rels
const docRelsXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/>
</Relationships>`;
fs.writeFileSync(path.join(wordRelsDir, 'document.xml.rels'), docRelsXml, 'utf8');

// 4. word/styles.xml
const stylesXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:styles xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
  <w:docDefaults>
    <w:rPrDefault>
      <w:rPr>
        <w:rFonts w:ascii="Times New Roman" w:hAnsi="Times New Roman" w:cs="Times New Roman"/>
        <w:sz w:val="26"/>
        <w:szCs w:val="26"/>
        <w:lang w:val="vi-VN"/>
      </w:rPr>
    </w:rPrDefault>
    <w:pPrDefault>
      <w:pPr>
        <w:spacing w:line="300" w:lineRule="auto" w:after="120"/>
      </w:pPr>
    </w:pPrDefault>
  </w:docDefaults>
  
  <w:style w:type="paragraph" w:default="1" w:styleId="Normal">
    <w:name w:val="Normal"/>
    <w:qFormat/>
  </w:style>
  
  <w:style w:type="paragraph" w:styleId="Heading1">
    <w:name w:val="heading 1"/>
    <w:basedOn w:val="Normal"/>
    <w:next w:val="Normal"/>
    <w:qFormat/>
    <w:pPr>
      <w:spacing w:before="240" w:after="140"/>
      <w:outlineLvl w:val="0"/>
    </w:pPr>
    <w:rPr>
      <w:rFonts w:ascii="Times New Roman" w:hAnsi="Times New Roman"/>
      <w:b/>
      <w:color w:val="1D4ED8"/>
      <w:sz w:val="32"/>
      <w:szCs w:val="32"/>
    </w:rPr>
  </w:style>
  
  <w:style w:type="paragraph" w:styleId="Heading2">
    <w:name w:val="heading 2"/>
    <w:basedOn w:val="Normal"/>
    <w:next w:val="Normal"/>
    <w:qFormat/>
    <w:pPr>
      <w:spacing w:before="180" w:after="100"/>
      <w:outlineLvl w:val="1"/>
    </w:pPr>
    <w:rPr>
      <w:rFonts w:ascii="Times New Roman" w:hAnsi="Times New Roman"/>
      <w:b/>
      <w:color w:val="0F172A"/>
      <w:sz w:val="28"/>
      <w:szCs w:val="28"/>
    </w:rPr>
  </w:style>

  <w:style w:type="paragraph" w:styleId="Heading3">
    <w:name w:val="heading 3"/>
    <w:basedOn w:val="Normal"/>
    <w:next w:val="Normal"/>
    <w:qFormat/>
    <w:pPr>
      <w:spacing w:before="140" w:after="80"/>
      <w:outlineLvl w:val="2"/>
    </w:pPr>
    <w:rPr>
      <w:rFonts w:ascii="Times New Roman" w:hAnsi="Times New Roman"/>
      <w:b/>
      <w:i/>
      <w:color w:val="1E293B"/>
      <w:sz w:val="26"/>
      <w:szCs w:val="26"/>
    </w:rPr>
  </w:style>
</w:styles>`;
fs.writeFileSync(path.join(wordDir, 'styles.xml'), stylesXml, 'utf8');

// Helper to escape XML
function escapeXml(unsafe) {
    if (!unsafe) return '';
    return unsafe
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&apos;');
}

// Read markdown source
const mdPath = path.join(__dirname, 'BAO_CAO_CHI_TIET_12_TRANG.md');
const mdContent = fs.readFileSync(mdPath, 'utf8');
const lines = mdContent.split(/\r?\n/);

let bodyXml = '';
let inCodeBlock = false;
let codeBuffer = [];
let inTable = false;
let tableRows = [];

function flushCodeBlock() {
    if (codeBuffer.length === 0) return;
    for (let cl of codeBuffer) {
        bodyXml += `
        <w:p>
          <w:pPr>
            <w:pBdr>
              <w:left w:val="single" w:sz="18" w:space="8" w:color="3B82F6"/>
            </w:pBdr>
            <w:shd w:val="clear" w:color="auto" w:fill="F1F5F9"/>
            <w:spacing w:line="240" w:lineRule="auto" w:before="20" w:after="20"/>
            <w:ind w:left="360" w:right="360"/>
          </w:pPr>
          <w:r>
            <w:rPr>
              <w:rFonts w:ascii="Consolas" w:hAnsi="Consolas" w:cs="Consolas"/>
              <w:sz w:val="21"/>
              <w:szCs w:val="21"/>
              <w:color w:val="0F172A"/>
            </w:rPr>
            <w:t xml:space="preserve">${escapeXml(cl)}</w:t>
          </w:r>
        </w:p>`;
    }
    codeBuffer = [];
}

function flushTable() {
    if (tableRows.length === 0) return;
    bodyXml += `
    <w:tbl>
      <w:tblPr>
        <w:tblW w:w="9600" w:type="dxa"/>
        <w:tblBorders>
          <w:top w:val="single" w:sz="6" w:space="0" w:color="CBD5E1"/>
          <w:left w:val="single" w:sz="6" w:space="0" w:color="CBD5E1"/>
          <w:bottom w:val="single" w:sz="6" w:space="0" w:color="CBD5E1"/>
          <w:right w:val="single" w:sz="6" w:space="0" w:color="CBD5E1"/>
          <w:insideH w:val="single" w:sz="4" w:space="0" w:color="E2E8F0"/>
          <w:insideV w:val="single" w:sz="4" w:space="0" w:color="E2E8F0"/>
        </w:tblBorders>
        <w:tblCellMar>
          <w:top w:w="120" w:type="dxa"/>
          <w:left w:w="160" w:type="dxa"/>
          <w:bottom w:w="120" w:type="dxa"/>
          <w:right w:w="160" w:type="dxa"/>
        </w:tblCellMar>
      </w:tblPr>`;

    for (let rIdx = 0; rIdx < tableRows.length; rIdx++) {
        const row = tableRows[rIdx];
        const isHeader = (rIdx === 0);
        bodyXml += `
        <w:tr>`;
        for (let col of row) {
            bodyXml += `
            <w:tc>
              <w:tcPr>
                ${isHeader ? '<w:shd w:val="clear" w:color="auto" w:fill="E2E8F0"/>' : ''}
              </w:tcPr>
              <w:p>
                <w:pPr>
                  <w:spacing w:line="260" w:lineRule="auto" w:after="40"/>
                  ${isHeader ? '<w:jc w:val="center"/>' : ''}
                </w:pPr>
                <w:r>
                  <w:rPr>
                    ${isHeader ? '<w:b/><w:color w:val="0F172A"/>' : '<w:color w:val="334155"/>'}
                    <w:sz w:val="23"/>
                  </w:rPr>
                  <w:t>${escapeXml(col.trim())}</w:t>
                </w:r>
              </w:p>
            </w:tc>`;
        }
        bodyXml += `
        </w:tr>`;
    }

    bodyXml += `
    </w:tbl>
    <w:p><w:pPr><w:spacing w:after="160"/></w:pPr></w:p>`;
    tableRows = [];
}

for (let line of lines) {
    let trimmed = line.trim();

    if (trimmed.startsWith('```')) {
        if (inCodeBlock) {
            inCodeBlock = false;
            flushCodeBlock();
        } else {
            inCodeBlock = true;
            flushTable();
        }
        continue;
    }

    if (inCodeBlock) {
        codeBuffer.push(line);
        continue;
    }

    // Page break
    if (trimmed === '\\newpage') {
        flushTable();
        bodyXml += `
        <w:p>
          <w:r>
            <w:br w:type="page"/>
          </w:r>
        </w:p>`;
        continue;
    }

    // Markdown Table
    if (trimmed.startsWith('|') && trimmed.endsWith('|')) {
        // Skip separator line | :--- | :--- |
        if (/^\|(\s*[:\-]+\s*\|)+$/.test(trimmed)) {
            continue;
        }
        const cells = trimmed.split('|').slice(1, -1);
        tableRows.push(cells);
        inTable = true;
        continue;
    } else {
        if (inTable) {
            flushTable();
            inTable = false;
        }
    }

    // Empty line
    if (trimmed === '' || trimmed === '<br>' || trimmed === '<br><br>') {
        continue;
    }

    // Horizontal rule
    if (trimmed === '---') {
        bodyXml += `
        <w:p>
          <w:pPr>
            <w:pBdr>
              <w:bottom w:val="single" w:sz="6" w:space="8" w:color="CBD5E1"/>
            </w:pBdr>
            <w:spacing w:after="180"/>
          </w:pPr>
        </w:p>`;
        continue;
    }

    // Heading 1
    if (trimmed.startsWith('# ')) {
        const text = trimmed.substring(2).trim();
        bodyXml += `
        <w:p>
          <w:pPr>
            <w:pStyle w:val="Heading1"/>
          </w:pPr>
          <w:r>
            <w:t>${escapeXml(text)}</w:t>
          </w:r>
        </w:p>`;
        continue;
    }

    // Heading 2
    if (trimmed.startsWith('## ')) {
        const text = trimmed.substring(3).trim();
        bodyXml += `
        <w:p>
          <w:pPr>
            <w:pStyle w:val="Heading2"/>
          </w:pPr>
          <w:r>
            <w:t>${escapeXml(text)}</w:t>
          </w:r>
        </w:p>`;
        continue;
    }

    // Heading 3
    if (trimmed.startsWith('### ')) {
        const text = trimmed.substring(4).trim();
        bodyXml += `
        <w:p>
          <w:pPr>
            <w:pStyle w:val="Heading3"/>
          </w:pPr>
          <w:r>
            <w:t>${escapeXml(text)}</w:t>
          </w:r>
        </w:p>`;
        continue;
    }

    // Bullet points
    if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
        const text = trimmed.substring(2).trim();
        bodyXml += `
        <w:p>
          <w:pPr>
            <w:ind w:left="480" w:hanging="240"/>
            <w:spacing w:line="280" w:lineRule="auto" w:after="80"/>
          </w:pPr>
          <w:r>
            <w:rPr>
              <w:rFonts w:ascii="Symbol" w:hAnsi="Symbol"/>
            </w:rPr>
            <w:t></w:t>
          </w:r>
          <w:r>
            <w:t xml:space="preserve">  ${escapeXml(text.replace(/\*\*(.*?)\*\*/g, '$1'))}</w:t>
          </w:r>
        </w:p>`;
        continue;
    }

    // Numbered list
    if (/^\d+\.\s+/.test(trimmed)) {
        bodyXml += `
        <w:p>
          <w:pPr>
            <w:ind w:left="480" w:hanging="240"/>
            <w:spacing w:line="280" w:lineRule="auto" w:after="80"/>
          </w:pPr>
          <w:r>
            <w:t xml:space="preserve">${escapeXml(trimmed.replace(/\*\*(.*?)\*\*/g, '$1'))}</w:t>
          </w:r>
        </w:p>`;
        continue;
    }

    // Regular paragraph
    bodyXml += `
    <w:p>
      <w:pPr>
        <w:jc w:val="both"/>
        <w:ind w:firstLine="360"/>
        <w:spacing w:line="300" w:lineRule="auto" w:after="120"/>
      </w:pPr>
      <w:r>
        <w:t>${escapeXml(trimmed.replace(/\*\*(.*?)\*\*/g, '$1').replace(/\*(.*?)\*/g, '$1'))}</w:t>
      </w:r>
    </w:p>`;
}

if (inTable) flushTable();
if (inCodeBlock) flushCodeBlock();

// 5. word/document.xml with page layout (A4, 2cm/2.5cm standard margin)
const docXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"
            xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">
  <w:body>
    ${bodyXml}
    <w:sectPr>
      <w:pgSz w:w="11906" w:h="16838"/>
      <w:pgMar w:top="1134" w:right="1134" w:bottom="1134" w:left="1417" w:header="708" w:footer="708" w:gutter="0"/>
      <w:cols w:space="708"/>
      <w:docGrid w:linePitch="360"/>
    </w:sectPr>
  </w:body>
</w:document>`;
fs.writeFileSync(path.join(wordDir, 'document.xml'), docXml, 'utf8');

console.log('OpenXML structure built successfully!');
