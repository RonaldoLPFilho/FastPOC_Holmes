export default interface ApiResponse {
  documents: {
    id: number;
    name: string;
    sourceSystemName: string;
  }[];
  results: {
    id: number;
    supplierName: string;
    countries: string[];
    totals: {
      documentId: number;
      total: number;
    }
  }[];
}