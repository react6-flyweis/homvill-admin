import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";

// Contractor persons
const GET_ALL_CONTRACTOR_PERSONS = `/api/contracts-contractor-person/getall`;

async function fetchAllContractorPersons() {
  const { data } = await api.get(GET_ALL_CONTRACTOR_PERSONS);
  return data;
}

export function useGetAllContractorPersons(options = {}) {
  return useQuery({
    queryKey: ["contractor-persons"],
    queryFn: () => fetchAllContractorPersons(),
    select: (res) => res.data,
    onError: (err) => {
      if (options.onError) options.onError(err);
    },
    ...options,
  });
}

// Contract companies (merged from contractCompanies.js)
const GET_ALL_CONTRACT_COMPANIES = () => `/api/contracts-company/getall`;

async function fetchAllContractCompanies() {
  const { data } = await api.get(GET_ALL_CONTRACT_COMPANIES());
  return data;
}

export function useGetAllContractCompanies(options = {}) {
  return useQuery({
    queryKey: ["contract-companies"],
    queryFn: () => fetchAllContractCompanies(),
    select: (res) => ({ items: res?.data || [], count: res?.count || 0 }),
    onError: (err) => {
      if (options.onError) options.onError(err);
    },
    ...options,
  });
}

// Contract categories
const GET_ALL_CONTRACT_CATEGORIES = () => `/api/contracts-category/getall`;

async function fetchAllContractCategories() {
  const { data } = await api.get(GET_ALL_CONTRACT_CATEGORIES());
  return data;
}

export function useGetAllContractCategories(options = {}) {
  return useQuery({
    queryKey: ["contract-categories"],
    queryFn: () => fetchAllContractCategories(),
    select: (res) => ({ items: res?.data || [], count: res?.count || 0 }),
    onError: (err) => {
      if (options.onError) options.onError(err);
    },
    ...options,
  });
}
