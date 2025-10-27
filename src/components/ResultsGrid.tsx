import { Col, Empty, message, Row } from "antd";
import ProviderCard from "./ProviderCard";
import { useState } from "react";
import ProviderDrawer from "./ProviderDrawer";

interface Props{
  data: any;
}

export default function ResultsGrid({data}: Props){
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState<any | null>(null);

  if(!data) return <Empty description="sin resultados" style={{marginTop: 64}}/>


  const handleOpen = (result: any) => {
    setCurrent(result);
    setOpen(true);
  };

  const handleExport = (selectedIds: number[]) => {
    message.success(`Exportação iniciada (${selectedIds.length})`);
  };

  return (
    <div>
      <h3 style={{marginBottom: 16}}>Resultados ({data.totalResults})</h3>
      <Row gutter={[16,16]}>
        {data.results.map((result: any) => (
          <Col span={12} key={result.id}>
            <ProviderCard result={result} documents={data.documents} onOpen={handleOpen} />
          </Col>
        ))}
      </Row>
      <ProviderDrawer
        open={open}
        onClose={() => setOpen(false)}
        onExport={handleExport}
        result={current}
        documents={data.documents}
      />
    </div>
  )
}