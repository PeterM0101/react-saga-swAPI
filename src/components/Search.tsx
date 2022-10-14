import React, { ChangeEvent, FC, useState } from "react";
import { Form, InputGroup } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { loadPeople } from "../redux/slices/people";
import { peopleSelector } from "../redux/selectors";

const Search: FC = () => {
  const dispatch = useAppDispatch();
  const { search: prevSearch } = useAppSelector(peopleSelector);
  const [search, setSearch] = useState(prevSearch);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    dispatch(loadPeople({ page: 1, search: e.target.value }));
  };

  return (
    <InputGroup className="mb-3">
      <InputGroup.Text id="inputGroup-sizing-default">
        Search people
      </InputGroup.Text>
      <Form.Control
        aria-label="Default"
        aria-describedby="inputGroup-sizing-default"
        onChange={handleSearchChange}
        value={search}
      />
    </InputGroup>
  );
};

export default Search;
