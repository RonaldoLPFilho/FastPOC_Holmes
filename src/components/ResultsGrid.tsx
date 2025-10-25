import { Col, Empty, Row } from "antd";
import ProviderCard from "./ProviderCard";

interface Props{
  data: any;
}

export default function ResultsGrid({data}: Props){
  if(!data) return <Empty description="sin resultados" style={{marginTop: 64}}/>

  return (
    <div>
      <h3 style={{marginBottom: 16}}>Resultados ({data.results.lenght})</h3>
      <Row gutter={[16,16]}>
        {data.results.map((result: any) => (
          <Col span={12} key={result.id}>
            <ProviderCard result={result} documents={data.documents} />
          </Col>
        ))}

      </Row>
    </div>
  )
}