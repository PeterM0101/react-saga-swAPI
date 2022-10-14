import React, { ChangeEvent, FC, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import RenderTable from "../UI/RenderTable";
import { TableSchema } from "../type/table";
import { peopleSelector } from "../redux/selectors";
import { Container } from "react-bootstrap";
import Details from "../components/Details";
import PeopleTablePagination from "../components/PeopleTablePagination";
import { loadPeople } from "../redux/slices/people";
import Search from "../components/Search";

const peopleTableSchema: TableSchema[] = [
  {
    width: "5%",
    title: "#",
    fieldName: "#",
  },
  {
    width: "15%",
    title: "Name",
    fieldName: "name",
  },
  {
    width: "10%",
    title: "Birth year",
    fieldName: "birth_year",
  },
  {
    width: "10%",
    title: "Gender",
    fieldName: "gender",
  },
  {
    width: "10%",
    title: "People world",
    fieldName: "homeworld",
  },
  {
    width: "10%",
    title: "Species",
    fieldName: "species",
  },
  {
    width: "10%",
    title: "Height",
    fieldName: "height",
  },
  {
    width: "10%",
    title: "Mass",
    fieldName: "mass",
  },
  {
    width: "10%",
    title: "Skin color",
    fieldName: "skin_color",
  },
  {
    width: "10%",
    title: "Details",
    fieldName: "link",
  },
];

const People: FC = () => {
  const {
    people,
    isLoading,
    total = 0,
    page = 1,
  } = useAppSelector(peopleSelector);
  const dispatch = useAppDispatch();

  const changePage = (newPage: number) =>
    dispatch(loadPeople({ page: newPage }));

  return (
    <Container fluid>
      <Search />
      {isLoading ? (
        <p>Loading ...</p>
      ) : (
        <RenderTable
          data={people}
          tableStructure={peopleTableSchema}
          page={page}
        />
      )}
      <PeopleTablePagination
        total={total}
        page={page}
        onChange={(newPage) => {
          changePage(newPage);
        }}
      />
    </Container>
  );
};

export default People;
