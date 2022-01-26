import { useState } from "react";
import { Company } from "../../components/company";
import { CompanyType } from "../../dataLayer/api";

export function ConnectedCompaniesView() {
    const [company, setCompany] = useState<CompanyType | undefined>()

    return (
        <>
            <h2>Connected Companies</h2>
            <Company company={company}>
                <h2>Please select a company</h2>
            </Company>
        </>
    );
}