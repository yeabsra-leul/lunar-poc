"use client";

import { company as Company } from "@/app/generated/prisma/client";
import {
  ChevronDown,
  Link as LinkIcon,
  ListCheck,
  Loader2,
  MoreVertical,
  Pencil,
  Plus,
  Search,
  Trash2,
  UnfoldHorizontal,
  X,
} from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { Button } from "../ui/button";
import CompanyDetail from "./CompanyDetail";

interface CompaniesProps {
  initialCompanies: Company[];
  initialSkip: number;
  totalCount: number;
}

export default function Companies({
  initialCompanies,
  initialSkip,
  totalCount,
}: CompaniesProps) {
  const [companies, setCompanies] = useState<Company[]>(initialCompanies);
  const [sidebarWidth, setSidebarWidth] = useState(500);
  const [isResizing, setIsResizing] = useState(false);
  const [showListMenu, setShowListMenu] = useState(false);
  const [liststatus, setListstatus] = useState("Long List");
  const [selectedCompanyId, setSelectedCompanyId] = useState<number>(
    companies[0]?.id
  );
  const [skip, setSkip] = useState(initialSkip);
  const [isLoadingMoreCompanies, setIsLoadingMoreCompanies] = useState(false);
  const hasMore = companies.length < totalCount;

  const loadMoreCompanies = async () => {
    setIsLoadingMoreCompanies(true);

    try {
      const response = await fetch(`/api/companies?skip=${skip}`);
      const data = await response.json();

      setCompanies((prevCompanies) => [...prevCompanies, ...data.companies]);
      setSkip((prevSkip) => prevSkip + data.pageSize);
    } catch (error) {
      console.error("Failed to load more companies:", error);
    } finally {
      setIsLoadingMoreCompanies(false);
    }
  };

  const startResizing = useCallback(() => setIsResizing(true), []);
  const stopResizing = useCallback(() => setIsResizing(false), []);

  const resize = useCallback(
    (mouseMoveEvent: MouseEvent) => {
      if (isResizing) {
        setSidebarWidth(mouseMoveEvent.clientX);
      }
    },
    [isResizing]
  );

  useEffect(() => {
    window.addEventListener("mousemove", resize);
    window.addEventListener("mouseup", stopResizing);
    return () => {
      window.removeEventListener("mousemove", resize);
      window.removeEventListener("mouseup", stopResizing);
    };
  }, [resize, stopResizing]);

  const activeCompany =
    companies.find((c) => c.id === selectedCompanyId) || companies[0];

  return (
    <div className="flex h-full bg-neutral-50">
      {/* companies list sidebar */}
      <div
        className="bg-white border-r border-neutral-200 flex flex-col shrink-0 relative"
        style={{ width: sidebarWidth, minWidth: 300, maxWidth: 600 }}
      >
        <div className="p-4 border-b border-neutral-200 space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-y-2">
            <div className="relative">
              <button
                onClick={() => setShowListMenu(!showListMenu)}
                className="flex items-center gap-4 font-semibold text-subtitle-dark text-xs hover:bg-neutral-50 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <ListCheck size={16} />
                  <span>{liststatus}</span>
                </div>
                <ChevronDown
                  className={`w-5 h-5 text-subtitle-dark transition-transform ${
                    showListMenu ? "rotate-180" : ""
                  }`}
                />
              </button>

              {showListMenu && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setShowListMenu(false)}
                  />
                  <div className="absolute top-full left-0 mt-1 w-56 bg-white rounded-xl shadow-xl border border-neutral-100 py-1 z-20 overflow-hidden animate-in fade-in zoom-in-95 duration-100">
                    {["Long List", "Short List", "Archived"].map((status) => (
                      <button
                        key={status}
                        onClick={() => {
                          setListstatus(status);
                          setShowListMenu(false);
                        }}
                        className={`w-full text-left px-4 py-2.5 text-sm hover:bg-neutral-50 transition-colors ${
                          status === liststatus
                            ? "font-medium text-blue-600 bg-blue-50"
                            : "text-subtitle-dark"
                        }`}
                      >
                        {status}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                className="text-blue-600 text-sm hover:bg-blue-50 flex items-center gap-2 cursor-pointer"
                size="sm"
              >
                <Pencil size={14} />
                <span>Edit</span>
              </Button>
              <Button
                variant="ghost"
                className="text-blue-600 text-sm hover:bg-blue-50 flex items-center gap-2 cursor-pointer"
                size="sm"
              >
                <Plus size={14} />
                <span>Add task</span>
              </Button>
              <button className="p-1 text-neutral-400 hover:text-neutral-600 rounded cursor-pointer">
                <MoreVertical className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="relative group">
            <Search
              size={14}
              className="text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2 group-focus-within:text-blue-500 transition-colors"
            />
            <input
              type="text"
              placeholder="Search for anything..."
              className="pl-9 pr-4 py-1.5 min-w-70 border border-neutral-200 rounded-lg text-xs text-subtitle-dark bg-white placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 transition-all shadow-xs"
            />
          </div>
        </div>

        <div className="grid grid-cols-[40px_1fr_1fr] px-4 py-2 bg-neutral-50 text-xs font-semibold text-neutral-500 border-b border-neutral-200">
          <div>ID</div>
          <div>Company name</div>
          <div>Tags</div>
        </div>

        {/* companies list */}
        <div className="flex-1 overflow-y-auto scrollbar-custom">
          {companies.map((company) => (
            <div
              key={company.id}
              onClick={() => setSelectedCompanyId(company.id)}
              className={`
                grid grid-cols-[40px_1fr_1fr] px-4 py-3 border-b border-neutral-100 cursor-pointer items-center text-sm
                ${
                  company.id === selectedCompanyId
                    ? "bg-blue-50/50"
                    : "hover:bg-neutral-50"
                }
              `}
            >
              <div className="text-neutral-500">{company.id}</div>
              <div
                className={`font-medium text-sm ${
                  company.id === selectedCompanyId
                    ? "text-blue-700"
                    : "text-title-dark"
                }`}
              >
                {company.name}
              </div>
              <div className="flex items-center gap-1 flex-wrap">
                {["Big company", "Urgent", "Hot"].map((tag, i) => (
                  <span
                    key={i}
                    className="px-2 py-0.5 bg-neutral-100 border border-neutral-200 rounded text-xs text-neutral-600 whitespace-nowrap"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}

          {hasMore && (
            <Button
              variant="outline"
              size="sm"
              onClick={loadMoreCompanies}
              disabled={isLoadingMoreCompanies}
              className="rounded-full w-full text-subtitle-dark/80 hover:text-subtitle-dark font-semibold my-4 cursor-pointer flex items-center gap-2"
            >
              {isLoadingMoreCompanies ? (
                <>
                  <Loader2 className="animate-spin" size={14} />
                  <span>Loading...</span>
                </>
              ) : (
                <span>Load More</span>
              )}
            </Button>
          )}
        </div>

        <div
          className="absolute -right-3 top-[108px] z-20 cursor-grab group/handle"
          onMouseDown={startResizing}
        >
          <div className="w-6 h-6 bg-white border border-neutral-200 rounded-full shadow-sm flex items-center justify-center group-hover/handle:border-blue-400 group-hover/handle:ring-2 group-hover/handle:ring-blue-100 transition-all">
            <UnfoldHorizontal className="w-4 h-4 text-subtitle-dark/80 group-hover/handle:text-blue-500" />
          </div>
        </div>

        <div
          className="absolute right-0 top-0 bottom-0 w-1 cursor-col-resize hover:bg-blue-500/0 transition-colors z-10"
          onMouseDown={startResizing}
        />
      </div>

      {/* company details panel */}
      <CompanyDetail activeCompany={activeCompany} />
    </div>
  );
}
