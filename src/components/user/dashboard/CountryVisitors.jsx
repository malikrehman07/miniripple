import React from "react";
import VisitorsByCountryForm from "./VisitorsByCountryForm";
import VisualRepresentationMap from "./VisualRepresentationMap";

function CountryVisitors({ data }) {
    return (
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center mt-6 mx-6">
            <VisitorsByCountryForm data={data} />
            <VisualRepresentationMap />
        </section>
    );
}

export default CountryVisitors;
