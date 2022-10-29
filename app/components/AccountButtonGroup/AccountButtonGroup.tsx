import Link from "next/link";
import { Children } from "react";
import AccountButton from "../AccountButton/AccountButton"

type AccountButtonGroupProps = {
    children: JSX.Element|Array<JSX.Element>;
};
  
export default function AccountButtonGroup(props: AccountButtonGroupProps) {
    return (
        <div className="AccountButtonGroup mt-4 mb-4">
            {props.children}
        </div>
    )
}