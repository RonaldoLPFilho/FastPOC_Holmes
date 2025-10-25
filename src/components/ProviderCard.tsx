import { Card, Space, Tag } from "antd";
import ReactCountryFlag from "react-country-flag";

interface Props {
  result: any;
  documents: any[];
}

export default function ProviderCard({result, documents}: Props){
  const totalDocuments = result.totals.reduce(
    (acc: number, doc: any) => acc + doc.total,
    0
  );

  const getDocumentName = (id: number) =>
    documents.find((d) => d.id === id)?.name ?? "DEsconocido";

  return (
    <Card
      title={
        <div style={{display: "flex", alignItems: "center", gap: 8}}>
          {result.countries.map((c: string) => (
            <ReactCountryFlag
              key={c}
              svg
              countryCode={c}
              style={{fontSize: 20}}
            />
          ))}
          <span style={{fontWeight: 600}}>{result.supplierName}</span>
        </div>
      }
      variant="outlined"
      style={{borderRadius: 12}}
      extra={<Tag color="blue">{totalDocuments}</Tag>}
    >
      <Space direction="vertical" style={{width: "100%"}}>
        {result.totals.map((t: any) => (
          <div
            key={t.document}
            style={{display: "flex", justifyContent: "space-beetwen", fontSize: 14, padding: "2px 4px"}}
          >
            <span>{getDocumentName(t.documentId)}</span>
            <Tag color="default">{t.total}</Tag>
          </div>
        ))}
      </Space>
    </Card>
  )
}