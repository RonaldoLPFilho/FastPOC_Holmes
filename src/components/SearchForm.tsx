import { Button, Col, DatePicker, Form, Input, Row, Select } from "antd";

import dayjs from "dayjs";

const { RangePicker } = DatePicker;

interface Props {
  onSearch: () => void;
}

export default function SearchForm({ onSearch }: Props) {
  const [form] = Form.useForm();

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onSearch}
      initialValues={{
        dataRange: [dayjs().startOf("month"), dayjs().endOf("month")],
      }}
    >
      <Row gutter={16}>
        <Col span={6}>
          <Form.Item name="provider" label="Provedor">
            <Input placeholder="Ingrese el provedor" />
          </Form.Item>
        </Col>

        <Col span={8}>
          <Form.Item name="documentTypes" label="Tipos de Documento">
            <Select
              mode="multiple"
              placeholder="Seleccione tipos de documento"
              options={[
                { label: "XML de Soporte No Obligados CO", value: "XML" },
                {
                  label: "Certificado de Retención en la Fuente EC",
                  value: "Certificado",
                },
              ]}
            />
          </Form.Item>
        </Col>

        <Col span={8}>
          <Form.Item name="dataRange" label="Tango de fechas">
            <RangePicker format="DD/MM/YYYY" style={{ width: "100%" }} />
          </Form.Item>

          <Col span={2} style={{ display: "flex", alignItems: "end" }}>
            <Button type="primary" htmlType="submit" block>
              Buscar
            </Button>
          </Col>
        </Col>
      </Row>
    </Form>
  );
}
