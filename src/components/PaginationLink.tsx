"use client";

import { PRODUCTS_PER_PAGE } from "@/constants";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import queryString from "query-string";
import React from "react";

interface PaginationLinkProps {
  page?: number | string;
  disabled?: boolean;
  active?: boolean;
  children: React.ReactNode;
}

const PaginationLink = ({
  page,
  disabled,
  active,
  children,
}: PaginationLinkProps) => {
  const params = useSearchParams();
  const limit = PRODUCTS_PER_PAGE;
  const skip = page ? (Number(page) - 1) * limit : 0;

  let currentQuery = {};

  if (params) {
    currentQuery = queryString.parse(params?.toString());
  }

  const updatedQuery = {
    ...currentQuery,
    page: page,
    skip: skip,
  };

  return (
    <Link
      href={{ query: updatedQuery }}
      className={`p-2 text-2xl ${
        active ? "font-bold text-orange-500" : "text-gray-500"
      } ${disabled ? "pointer-events-none text-gray-200" : ""}`}
    >
      {children}
    </Link>
  );
};

export default PaginationLink;
