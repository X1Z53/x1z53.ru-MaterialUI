type DatabaseType = {
  name: string
  columns: Record<string, string>[]
  rows: string[][]
}


type SectionType = {
  section: string
  charsToUpCase: string
  description: string
}

type ViewType = {
  headers?: string[]
  database: any[]
  backgroundColors?: string[]
  caption?: string
  url?: string
  searchPlaces?: number[]
  titleColumn?: number
  haveFolders?: boolean
  folderColumn?: number
}

type TableType = {
  isFolder: boolean
  headersCount: number
  row: any
  backgroundColor?: string
}

type GridType = {
  isFolder: boolean
  tile: string[][]
  backgroundColor?: string
}


type ImportReplacementType = {
  name: string
  analogue: string
  registryNumber: string
  classes: string[]
}

type CollectionType = {
  name: string
  folder?: string
  type?: string
  version?: string
  file_type?: string
  size?: string
  sources?: string
  objects?: CollectionType[]
}


export type { CollectionType, DatabaseType, GridType, ImportReplacementType, SectionType, TableType, ViewType }
