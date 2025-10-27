import { useMemo, useState } from "react";
import { Badge, Checkbox, Drawer, List, Space, Tag, Typography, Button } from "antd";
import { FileTextOutlined } from "@ant-design/icons";


const { Text } = Typography;

type DocumentDef = { id: number; name: string; sourceSystemName: string };
type Result = {
  id: number;
  supplierName: string;
  countries: string[];
  totals: { documentId: number; total: number }[];
};

interface Props {
  open: boolean;
  onClose: () => void;
  onExport?: (selectedIds: number[]) => void;
  result: Result | null;
  documents: DocumentDef[];
}

export default function ProviderDrawer({ open, onClose, onExport, result, documents }: Props) {
  const [selected, setSelected] = useState<number[]>([]);

  const items = useMemo(() => {
    if (!result) return [];
    return result.totals.map(t => {
      const doc = documents.find(d => d.id === t.documentId);
      return {
        id: t.documentId,
        name: doc?.name ?? `Documento ${t.documentId}`,
        total: t.total,
      };
    });
  }, [result, documents]);

  const totalDocs = useMemo(
    () => items.reduce((acc, it) => acc + it.total, 0),
    [items]
  );

  const header = (
    <div className="flex items-center gap-3">
      <div className="flex flex-col">
        <Text strong style={{ fontSize: 16 }}>{result?.supplierName}</Text>
      </div>
    </div>
  );

  const footer = (
    <div className="flex gap-3">
      <Button onClick={onClose} block>Cerrar</Button>
      <Button
        type="primary"
        block
        disabled={selected.length === 0}
        onClick={() => onExport?.(selected)}
        icon={<span className="anticon"><svg width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M5 20h14v-2H5zm7-16l-5 5h3v4h4v-4h3z"/></svg></span>}
      >
        Exportar {selected.length > 0 ? `(${selected.length})` : ""}
      </Button>
    </div>
  );

  return (
    <Drawer
      open={open}
      onClose={onClose}
      placement="bottom"
      height="50vh"
      title={header}
      footer={footer}
      destroyOnHidden
      bodyStyle={{ paddingTop: 8, paddingBottom: 12 }}
    >
      <div className="mb-3">
        <Text strong>Seleccione documentos para exportar</Text>
      </div>

      <List
        itemLayout="horizontal"
        dataSource={items}
        renderItem={(it) => (
          <List.Item
            style={{
              border: "1px solid var(--ant-color-border)",
              borderRadius: 12,
              padding: 12,
              marginBottom: 12,
            }}
            actions={[
              <Badge key="count" count={it.total} style={{ backgroundColor: "var(--ant-color-primary)" }} />,
            ]}
          >
            <Space align="start" size={12} style={{ width: "100%" }}>
              <Checkbox
                checked={selected.includes(it.id)}
                onChange={(e) => {
                  setSelected((prev) =>
                    e.target.checked ? [...prev, it.id] : prev.filter(id => id !== it.id)
                  );
                }}
              />
              <div className="flex-1">
                <div className="flex items-center gap-6 justify-between">
                  <Space>
                    <FileTextOutlined />
                    <Text>{it.name}</Text>
                  </Space>
                </div>
                <div>
                  <Text type="secondary" style={{ fontSize: 12 }}>
                    {it.total} documento{it.total === 1 ? "" : "s"} encontrados
                  </Text>
                </div>
              </div>
            </Space>
          </List.Item>
        )}
      />
    </Drawer>
  );
}
