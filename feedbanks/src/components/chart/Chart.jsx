import { useEffect, useState } from "react";
import Plot from "react-plotly.js";

export default function Chart(props) {

    // console.log("props", props);

    const [data, setData] = useState(props.data);
    const [attribute, setAttribute] = useState(props.attribute);

    const [x, setX] = useState();
    const [y, setY] = useState();


    // Effects
    useEffect(() => {
        setData(props.data);
        setAttribute(props.attribute)
    }, [props]);

    useEffect(() => {
        setX(data.map(item => item.date));
        setY(data.map(item => item[attribute]));
    }, [data]);


    return (
        <Plot
            data={[
                {
                    x,
                    y,
                    type: "scatter",
                    mode: "lines+markers",
                    name: "Price",
                },
            ]}
            layout={{
                title: "Historical Price",
                xaxis: {
                    title: "Date",
                },
                yaxis: {
                    title: "Price",
                },
                autosize: true,
            }}
            style={{ width: "100%", height: "500px" }}
            useResizeHandler
        />
    );
}