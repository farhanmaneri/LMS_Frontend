import { useSelector } from "react-redux";
import { selectCurrentUser } from "../redux/api/authSlice";
import {
  useGetStudentResultsQuery,
  useGetStudentsResultsQuery
} from "../redux/api/apiSlice";
import ResultList from "../components/ResultList";
import { CloudDownload } from "lucide-react";

export default function ResultsPage() {
  const user = useSelector(selectCurrentUser);
console.log(user._id)
  // Admin/Teacher → fetch all results
  const allResults = useGetStudentsResultsQuery(undefined, {
    skip: user?.role !== "admin" && user?.role !== "teacher",
  });

  // Student → fetch only their own results
  const studentResults = useGetStudentResultsQuery(user?._id, {
    skip: user?.role !== "student",
  });

  // Choose data based on role
  const results =
    user?.role === "student" ? studentResults.data : allResults.data;

  const isLoading =
    user?.role === "student" ? studentResults.isLoading : allResults.isLoading;

  const isError =
    user?.role === "student" ? studentResults.isError : allResults.isError;

  const error =
    user?.role === "student" ? studentResults.error : allResults.error;

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error?.data?.message || error?.error}</p>;

  return <ResultList results={results || []} />;
}

