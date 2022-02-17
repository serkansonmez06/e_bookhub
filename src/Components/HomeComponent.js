import React from "react";
import { Routes, Route } from "react-router-dom";
import IntroductionComponent from "./IntroductionComponent";
import AddNoteComponent from "./notes/AddNoteComponent";
import NotesComponent from "./notes/NotesComponent";
import UpdateComponent from "./notes/UpdateComponent";
import NotFoundComponent from "./NotFoundComponent";
import SearchComponent from "./SearchComponent";

const HomeComponent = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<IntroductionComponent />} />
        <Route path="/notes" element={<NotesComponent />} />
        <Route path="/search" element={<SearchComponent />} />
        <Route path="/add" element={<AddNoteComponent />} />
        <Route path="/update/:id" element={<UpdateComponent />} />
        <Route path="*" element={<NotFoundComponent />} />
      </Routes>
    </div>
  );
};

export default HomeComponent;
