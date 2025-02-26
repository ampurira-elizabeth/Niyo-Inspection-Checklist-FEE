"use client";
import { useEffect, useState } from "react";
import { api } from "@/services/api";
import { Inspection } from "../types/inspection";
import Layout from "../components/Layout";

const Inspections = () => {
  //   const [inspections, setInspections] = useState(Inspection[]);
  const [inspections, setInspections] = useState<Inspection[]>([]);
  const [loading, setLoading] = useState(true);

  const formatDate = (dateString: string): string => {
    // Check if dateString is a valid date
    if (dateString && !isNaN(new Date(dateString).getTime())) {
      const date = new Date(dateString);
      return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
    }
    // Return the original string if it's not a valid date
    return dateString;
  };

  useEffect(() => {
    const fetchInspections = async () => {
      try {
        const data = await api.inspectionResults();
        setInspections(data);
        console.log("📡 Inspections:", data);
      } catch (error) {
        console.error("Error fetching inspections:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchInspections();
  }, []);

  // const handlePrint = () => {
  //   window.print();
  // };
  const handlePrint = async () => {
    try {
      const blob = await api.printInspections(); // Get the Blob directly
  
      if (!blob) {
        throw new Error("Failed to download PDF");
      }
  
      const url = window.URL.createObjectURL(blob);
  
      // Create a temporary link to trigger download
      const a = document.createElement("a");
      a.href = url;
      a.download = "inspections.pdf";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
  
      // Release the object URL
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading PDF:", error);
    }
  };

  if (loading) {
    return <p className="text-center text-gray-500">Loading inspections...</p>;
  }

  return (
    <Layout>
    <div>
    <h1 className="text-center text-2xl font-bold">Inspection Results</h1>
      <button
        style={{
          background: "blue",
          padding: "10px",
          margin: "10px",
          border: "1px solid",
          borderRadius: "4px",
          color: "white",
        }}
        onClick={handlePrint}
      >
        Print
      </button>

      {inspections.length === 0 ? (
        <p>Loading...</p>
      ) : (
        <div className="table-container" style={{ margin: "20px 0" }}>
          <table
            style={{
              width: "100%",
              padding: "8px",
              borderCollapse: "collapse",
              border: "1px solid #ddd",
            }}
          >
            <thead>
              <tr
                style={{
                  backgroundColor: "#f2f2f2",
                  borderBottom: "2px solid #ddd",
                }}
              >
                <th
                  style={{
                    padding: "12px",
                    textAlign: "left",
                    border: "1px solid #ddd",
                  }}
                >
                  Garage Name
                </th>
                <th
                  style={{
                    padding: "12px",
                    textAlign: "left",
                    border: "1px solid #ddd",
                  }}
                >
                  Date
                </th>
                <th
                  style={{
                    padding: "12px",
                    textAlign: "left",
                    border: "1px solid #ddd",
                  }}
                >
                  Contact
                </th>
                <th
                  style={{
                    padding: "12px",
                    textAlign: "left",
                    border: "1px solid #ddd",
                  }}
                >
                  Location
                </th>
                <th
                  style={{
                    padding: "12px",
                    textAlign: "center",
                    border: "1px solid #ddd",
                  }}
                >
                  Total Score
                </th>
                <th
                  style={{
                    padding: "12px",
                    textAlign: "center",
                    border: "1px solid #ddd",
                  }}
                >
                  Percentage
                </th>
              </tr>
            </thead>
            <tbody>
              {inspections.map((inspection) => (
                <tr
                  key={inspection.id}
                  style={{ borderBottom: "1px solid #ddd" }}
                >
                  <td style={{ padding: "8px", border: "1px solid #ddd" }}>
                    {inspection.garage_name}
                  </td>
                  <td style={{ padding: "8px", border: "1px solid #ddd" }}>
                    {formatDate(inspection.date)}
                  </td>
                  <td style={{ padding: "8px", border: "1px solid #ddd" }}>
                    {inspection.contact_person_tel}
                  </td>
                  <td style={{ padding: "8px", border: "1px solid #ddd" }}>
                    {inspection.physical_location}
                  </td>
                  <td
                    style={{
                      padding: "8px",
                      textAlign: "center",
                      border: "1px solid #ddd",
                    }}
                  >
                    {inspection.total_score}
                  </td>
                  <td
                    style={{
                      padding: "8px",
                      textAlign: "center",
                      border: "1px solid #ddd",
                    }}
                  >
                    {inspection.percentage}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
    </Layout>
  );
};

export default Inspections;
