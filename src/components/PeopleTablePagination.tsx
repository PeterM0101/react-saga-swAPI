import React, { FC } from "react";
import { useAppSelector } from "../redux/hooks";
import { peopleSelector } from "../redux/selectors";

const perPage = 10;

interface PeopleTablePaginationProps {
  page?: number;
  onChange: (page: number) => void;
  total: number;
}

const PeopleTablePagination: FC<PeopleTablePaginationProps> = ({
  onChange,
  page,
  total,
}) => {
  const pages = Math.ceil(total / perPage);
  return (
    <div style={{ textAlign: "center" }}>
      {Array.from({ length: pages }, (_, index) => index + 1).map((item) => {
        const action = () => onChange(item);
        const styles = { cursor: "pointer" };
        return item === page ? (
          <b key={item} style={styles}>
            {item}{" "}
          </b>
        ) : (
          <span key={item} onClick={action} style={styles}>
            {item}{" "}
          </span>
        );
      })}
    </div>
  );
};

export default PeopleTablePagination;
