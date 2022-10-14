import React, { FC } from "react";
import { useAppSelector } from "../redux/hooks";
import { personSelector } from "../redux/selectors";

const Details: FC = () => {
  const { person, isLoading } = useAppSelector(personSelector);
  return (
    <div>
      {isLoading ? (
        "Loading ..."
      ) : (
        <>
          <h1>{person?.name}</h1>
          <p>{person?.gender}</p>
          <p>{person?.birth_year}</p>
        </>
      )}
    </div>
  );
};

export default Details;
