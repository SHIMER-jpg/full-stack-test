import React, { useEffect } from "react";

import { useDispatch } from "react-redux";

import { fetchFiles } from "../redux/files/filesSlice";

import { Nav } from "../components/Nav";
import { SearchBar } from "../components/SearchBar";
import { FilesTable } from "../components/FileTable"

export function MainScreen() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchFiles());
  }, []);

  return (
    <div>
      <Nav />
      <SearchBar />
      <FilesTable />
    </div>
  );
}
