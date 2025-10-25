import { useState } from "react";

import SearchForm from "../components/SearchForm";
import { Divider, Spin } from "antd";
import ResultsGrid from "../components/ResultsGrid";
import type ApiResponse from "../types/ApiResponse";

export default function DocumentSearchPage(){
  const [data, setData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${import.meta.env.BASE_URL}mocks/response.json`, {
        cache: "no-store",
      });
      if (!res.ok) {
        const txt = await res.text();
        throw new Error(`HTTP ${res.status} – corpo: ${txt.slice(0,120)}...`);
      }
      const json = await res.json();
      setData(json);
    } catch (error) {
      console.error("Erro ao carregar o JSON:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div style={{padding: 24}}>
      <h1 style={{fontSize: 22, fontWeight: 600, marginBottom: 16}}>Holmes</h1>
      <SearchForm onSearch={handleSearch}/>
      <Divider/>
      {loading ? (
        <div style={{textAlign: "center", marginTop: 48}}>
          <Spin size="large"/>
        </div>
      ) : (
        <ResultsGrid data={data}/>
      )}
    </div>
  )
}