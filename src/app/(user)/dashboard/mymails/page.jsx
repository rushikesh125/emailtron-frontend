"use client";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Filter, Search, Mail, Loader2, SortAsc, SortDesc } from "lucide-react";
import { useRouter } from "next/navigation";

export default function MyMails() {
  const user = useSelector((state) => state.user);
  const router = useRouter();
  const [emails, setEmails] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit] = useState(10);
  const [search, setSearch] = useState("");
  const [sentiment, setSentiment] = useState("all");
  const [priority, setPriority] = useState("all");
  const [category, setCategory] = useState("all");
  const [processingPriority, setProcessingPriority] = useState("all");
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("desc");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchEmails = async () => {
    if (!user?.uid) {
      setError("User not authenticated");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    const params = new URLSearchParams({
      page: currentPage.toString(),
      limit: limit.toString(),
      ...(search && { search }),
      ...(sentiment !== "all" && { sentiment }),
      ...(priority !== "all" && { priority }),
      ...(category !== "all" && { category }),
      ...(processingPriority !== "all" && { processingPriority }),
      sortBy,
      sortOrder,
    });

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/emails?${params.toString()}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId: user.uid }),
        }
      );

      if (!res.ok) {
        throw new Error(`Failed to fetch: ${res.status} ${res.statusText}`);
      }

      const { emails, totalPages } = await res.json();
      setEmails(emails || []);
      setTotalPages(totalPages || 1);
    } catch (error) {
      console.error("Error fetching emails:", error);
      setError(error.message || "Failed to load emails");
      setEmails([]);
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmails();
  }, [
    user?.uid,
    currentPage,
    search,
    sentiment,
    priority,
    category,
    processingPriority,
    sortBy,
    sortOrder,
  ]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const sentiments = ["Neutral", "Negative", "Positive"];
  const priorities = ["Urgent", "Not Urgent"];
  const categories = [
    "Support Query",
    "Urgent Technical Support Request",
    "Account Verification Support",
    "Billing Inquiry",
    "Account Access Issue",
    "Urgent Support Request",
  ];
  const procPriorities = [1, 2, 3];
  const sortFields = [
    "sentiment",
    "priority",
    "category",
    "processingPriority",
    "createdAt",
  ];

  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex justify-center items-center py-20">
          <Loader2 className="h-10 w-10 text-theme-purple animate-spin" />
        </div>
      );
    }

    if (error) {
      return (
        <div className="flex flex-col items-center justify-center py-20 text-center px-4">
          <div className="bg-red-50 text-red-600 p-6 rounded-xl shadow-lg max-w-md border-none">
            <p className="font-medium text-lg">Error: {error}</p>
            <Button
              onClick={fetchEmails}
              className="mt-4 bg-white text-theme-purple hover:bg-theme-purple hover:text-white shadow-sm rounded-lg px-6 py-2 transition-all duration-200 border-none"
            >
              Retry
            </Button>
          </div>
        </div>
      );
    }

    if (!emails || emails.length === 0) {
      return (
        <div className="flex justify-center items-center py-20">
          <div className="text-center text-gray-600">
            <Mail className="mx-auto h-12 w-12 text-gray-400" />
            <p className="mt-4 text-lg font-medium">No emails found</p>
            <p className="text-sm text-gray-500">
              Try adjusting your filters or search terms
            </p>
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-6">
        <div className="rounded-xl bg-white shadow-lg border-none overflow-hidden">
          <Table className="border-none">
            <TableHeader>
              <TableRow className="bg-gradient-to-r from-gray-50 to-white hover:bg-gray-50 transition-colors duration-200 border-none">
                <TableHead className="font-semibold text-gray-800 py-4 px-4">
                  Sender
                </TableHead>
                <TableHead className="font-semibold text-gray-800 py-4 px-4">
                  Subject
                </TableHead>
                <TableHead className="font-semibold text-gray-800 py-4 px-4">
                  Sentiment
                </TableHead>
                <TableHead className="font-semibold text-gray-800 py-4 px-4">
                  Priority
                </TableHead>
                <TableHead className="font-semibold text-gray-800 py-4 px-4">
                  Category
                </TableHead>
                <TableHead className="font-semibold text-gray-800 py-4 px-4">
                  Proc. Priority
                </TableHead>
                <TableHead className="font-semibold text-gray-800 py-4 px-4">
                  Issue Summary
                </TableHead>
                <TableHead className="font-semibold text-gray-800 py-4 px-4">
                  Received At
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {emails.map((email) => (
                <TableRow
                  key={email.id}
                  onClick={()=>router.push(`/dashboard/mymails/${email.id}`)}
                  className="cursor-pointer hover:bg-gray-50/50 transition-colors duration-200 border-t border-gray-100"
                >
                  <TableCell className="font-medium text-gray-900 py-4 px-4">
                    {email.sender}
                  </TableCell>
                  <TableCell className="max-w-xs truncate text-gray-700 py-4 px-4">
                    {email.subject}
                  </TableCell>
                  <TableCell className="py-4 px-4">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium transition-colors duration-150 ${
                        email.meta.sentiment === "Negative"
                          ? "bg-red-100 text-red-900"
                          : email.meta.sentiment === "Neutral"
                          ? "bg-yellow-100 text-yellow-900"
                          : "bg-green-100 text-green-900"
                      }`}
                    >
                      {email.meta.sentiment}
                    </span>
                  </TableCell>
                  <TableCell className="py-4 px-4">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium transition-colors duration-150 ${
                        email.meta.priority === "Urgent"
                          ? "bg-orange-100 text-orange-900"
                          : "bg-blue-100 text-blue-900"
                      }`}
                    >
                      {email.meta.priority}
                    </span>
                  </TableCell>
                  <TableCell className="max-w-xs truncate text-gray-700 py-4 px-4">
                    {email.meta.category}
                  </TableCell>
                  <TableCell className="text-gray-700 py-4 px-4">
                    <span
                      className={`
    inline-flex items-center justify-center w-8 h-8 rounded-full text-white font-medium
    ${email.meta.processingPriority === 1 ? "bg-red-500" : ""}
    ${email.meta.processingPriority === 2 ? "bg-yellow-500" : ""}
    ${email.meta.processingPriority === 3 ? "bg-green-500" : ""}
  `}
                    >
                      {Number(email.meta.processingPriority)}
                    </span>
                  </TableCell>
                  <TableCell className="max-w-xs truncate text-gray-700 py-4 px-4">
                    {email.meta.issueSummary}
                  </TableCell>
                  <TableCell className="text-gray-700 py-4 px-4 text-nowrap">
                    {new Date(email.receivedAt).toLocaleDateString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        {totalPages > 1 && (
          <div className="flex justify-center items-center py-6">
            <Pagination>
              <PaginationContent className="flex gap-2">
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      if (currentPage > 1) handlePageChange(currentPage - 1);
                    }}
                    className={`rounded-full px-4 py-2 bg-white text-gray-800 hover:bg-theme-purple hover:text-white shadow-sm transition-colors duration-200 border-none ${
                      currentPage === 1 ? "pointer-events-none opacity-50" : ""
                    }`}
                  />
                </PaginationItem>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <PaginationItem key={page}>
                      <PaginationLink
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          handlePageChange(page);
                        }}
                        className={`rounded-full px-4 py-2 text-gray-800 hover:bg-theme-purple hover:text-white shadow-sm transition-colors duration-200 border-none ${
                          page === currentPage
                            ? "bg-theme-purple text-white"
                            : "bg-white"
                        }`}
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  )
                )}
                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      if (currentPage < totalPages)
                        handlePageChange(currentPage + 1);
                    }}
                    className={`rounded-full px-4 py-2 bg-white text-gray-800 hover:bg-theme-purple hover:text-white shadow-sm transition-colors duration-200 border-none ${
                      currentPage === totalPages
                        ? "pointer-events-none opacity-50"
                        : ""
                    }`}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* <header className="bg-white shadow-sm border-none">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="bg-theme-purple/10 p-2 rounded-lg">
              <Mail className="h-6 w-6 text-theme-purple" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">
              Email Dashboard
            </h1>
          </div>
        </div>
      </header> */}

      <main className="container mx-auto py-6">
        <div className="mb-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <div className="relative flex-1 min-w-[240px]">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                <Input
                  className="pl-10 pr-4 py-2 bg-white rounded-lg shadow-sm focus:ring-2 focus:ring-theme-purple/50 border-none transition-all duration-200"
                  placeholder="Search emails..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>

              <div className="flex flex-wrap gap-3">
                <Select value={sentiment} onValueChange={setSentiment}>
                  <SelectTrigger className="w-[140px] bg-white rounded-lg shadow-sm focus:ring-2 focus:ring-theme-purple/50 hover:bg-gray-50 border-none transition-all duration-200">
                    <SelectValue placeholder="Sentiment" />
                  </SelectTrigger>
                  <SelectContent className="bg-white rounded-lg shadow-lg border-none">
                    <SelectItem value="all">All Sentiments</SelectItem>
                    {sentiments.map((s) => (
                      <SelectItem key={s} value={s}>
                        {s}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={priority} onValueChange={setPriority}>
                  <SelectTrigger className="w-[140px] bg-white rounded-lg shadow-sm focus:ring-2 focus:ring-theme-purple/50 hover:bg-gray-50 border-none transition-all duration-200">
                    <SelectValue placeholder="Priority" />
                  </SelectTrigger>
                  <SelectContent className="bg-white rounded-lg shadow-lg border-none">
                    <SelectItem value="all">All Priorities</SelectItem>
                    {priorities.map((p) => (
                      <SelectItem key={p} value={p}>
                        {p}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="w-[180px] bg-white rounded-lg shadow-sm focus:ring-2 focus:ring-theme-purple/50 hover:bg-gray-50 border-none transition-all duration-200">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent className="bg-white rounded-lg shadow-lg border-none">
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((c) => (
                    <SelectItem key={c} value={c}>
                      {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                value={processingPriority}
                onValueChange={setProcessingPriority}
              >
                <SelectTrigger className="w-[140px] bg-white rounded-lg shadow-sm focus:ring-2 focus:ring-theme-purple/50 hover:bg-gray-50 border-none transition-all duration-200">
                  <SelectValue placeholder="Proc. Priority" />
                </SelectTrigger>
                <SelectContent className="bg-white rounded-lg shadow-lg border-none">
                  <SelectItem value="all">All Priorities</SelectItem>
                  {procPriorities.map((pp) => (
                    <SelectItem key={pp} value={pp.toString()}>
                      {pp}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="bg-white rounded-lg shadow-sm hover:bg-gray-50 text-gray-800 hover:text-theme-purple transition-colors duration-200 border-none"
                  >
                    <Filter className="mr-2 h-4 w-4" />
                    Sort
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="w-48 bg-white rounded-lg shadow-lg border-none"
                >
                  <DropdownMenuLabel className="text-gray-800">
                    Sort By
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-gray-200" />
                  {sortFields.map((field) => (
                    <DropdownMenuItem
                      key={field}
                      onClick={() => setSortBy(field)}
                      className={`text-gray-800 hover:bg-theme-purple/10 hover:text-theme-purple ${
                        sortBy === field
                          ? "bg-theme-purple/10 text-theme-purple"
                          : ""
                      }`}
                    >
                      {field.charAt(0).toUpperCase() + field.slice(1)}
                    </DropdownMenuItem>
                  ))}
                  <DropdownMenuSeparator className="bg-gray-200" />
                  <DropdownMenuLabel className="text-gray-800">
                    Order
                  </DropdownMenuLabel>
                  <DropdownMenuItem
                    onClick={() => setSortOrder("asc")}
                    className={`text-gray-800 hover:bg-theme-purple/10 hover:text-theme-purple ${
                      sortOrder === "asc"
                        ? "bg-theme-purple/10 text-theme-purple"
                        : ""
                    }`}
                  >
                    Ascending <SortAsc className="ml-2 h-4 w-4" />
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => setSortOrder("desc")}
                    className={`text-gray-800 hover:bg-theme-purple/10 hover:text-theme-purple ${
                      sortOrder === "desc"
                        ? "bg-theme-purple/10 text-theme-purple"
                        : ""
                    }`}
                  >
                    Descending <SortDesc className="ml-2 h-4 w-4" />
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>

        {renderContent()}
      </main>
    </div>
  );
}
