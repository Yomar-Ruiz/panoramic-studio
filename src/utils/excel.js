import * as XLSX from 'xlsx'

export async function fetchExcelSheet(url) {
  try {
    const response = await fetch(url)
    const arrayBuffer = await response.arrayBuffer()
    const workbook = XLSX.read(arrayBuffer, { type: 'array' })
    const sheetName = workbook.SheetNames[0]
    const worksheet = workbook.Sheets[sheetName]
    return XLSX.utils.sheet_to_json(worksheet, { defval: '' })
  } catch (error) {
    console.error('Error leyendo el archivo Excel:', error)
    return []
  }
}

export async function loadPricingFromExcel() {
  return fetchExcelSheet('/pricing-data.xlsx')
}
