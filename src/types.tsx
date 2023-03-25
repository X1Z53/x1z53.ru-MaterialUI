type DataView = {
  headers?: string[]
  database: any[]
  backgroundColors?: string[]
}

type SectionCard = {
  section: string
  charsToUpCase: string
  description: string
}



type DatabaseRow = {
  name: string
  analogue: string
  registryNumber: string
  classes: string[]
}



type StyledTableRowsProps = {
  isFolder: boolean
  headersCount: number
  row: any[]
  backgroundColor?: string
}

type GridTileProps = {
  isFolder: boolean
  tile: any[]
  backgroundColor: string
}

type DatabaseType = {
  columns: { name: string }[]
  rows: any[][]
}

type ProgramType = {
  name: string
  folder?: string
  type?: string
  version?: string
  file_type?: string
  size?: string
  sources?: string
  objects?: ProgramType[]
}

export type { SectionCard, StyledTableRowsProps, DatabaseRow, GridTileProps, DataView, DatabaseType, ProgramType }