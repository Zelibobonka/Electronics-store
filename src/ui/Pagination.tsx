import { useSearchParams } from "react-router-dom";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import { PAGE_SIZE } from "../utils/constants";
import styled from "styled-components";

const StyledPagination = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem 2rem;
  flex-wrap: wrap;
  margin: 2rem 0 1rem;
`;

const P = styled.p`
  font-size: 1rem;
  margin-left: 0.7rem;

  & span {
    font-weight: 600;
  }
`;

const Buttons = styled.div`
  display: flex;
  gap: 0.6rem;
`;

const PaginationButton = styled.button`
  background-color: var(--color-grey-50);
  border: none;
  border-radius: 0.5rem;
  font-weight: 500;
  font-size: 1rem;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  padding: 0.2rem 0.7rem;
  transition: all 0.3s;

  &:has(span:last-child) {
    padding-left: 0.4rem;
  }

  &:has(span:first-child) {
    padding-right: 0.4rem;
  }

  & svg {
    height: 1.8rem;
    width: 1.8rem;
  }

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }
`;

const PaginationItem = styled.button<{ $active?: boolean }>`
  text-decoration: ${(props) => (props.$active ? "underline" : "none")};
`;

interface PaginationProps {
  count: number;
}

const Pagination: React.FC<PaginationProps> = ({ count }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = !searchParams.get("page")
    ? 1
    : Number(searchParams.get("page"));
  const pageCount = Math.ceil(count / PAGE_SIZE);
  const maxPagination = pageCount < 5 ? pageCount : 5;

  function handleNextPage() {
    const next = currentPage + 1;

    searchParams.set("page", String(next));
    setSearchParams(searchParams);
  }

  function handlePrevPage() {
    const prev = currentPage - 1;

    searchParams.set("page", String(prev));
    setSearchParams(searchParams);
  }

  function handleSetPage(page: number) {
    searchParams.set("page", String(page));
    setSearchParams(searchParams);
  }

  if (pageCount <= 1) return null;

  return (
    <StyledPagination>
      <P>
        <span>{(currentPage - 1) * PAGE_SIZE + 1}</span>&nbsp;&mdash;&nbsp;
        <span>
          {currentPage === pageCount ? count : currentPage * PAGE_SIZE}
        </span>
        &nbsp; из <span>{count}</span>
      </P>
      <Buttons>
        {currentPage > 1 && (
          <PaginationButton
            onClick={handlePrevPage}
            disabled={currentPage === 1}
          >
            <HiChevronLeft /> <span>Назад</span>
          </PaginationButton>
        )}

        {Array.from(
          { length: maxPagination },
          (_, i) =>
            i +
            (currentPage > pageCount - maxPagination
              ? pageCount - maxPagination + 1
              : currentPage)
        ).map((page) => (
          <PaginationItem
            key={page}
            $active={page === currentPage}
            onClick={() => handleSetPage(page)}
          >
            {page}
          </PaginationItem>
        ))}

        {currentPage !== pageCount && (
          <PaginationButton
            onClick={handleNextPage}
            disabled={currentPage === pageCount}
          >
            <span>Вперед</span> <HiChevronRight />
          </PaginationButton>
        )}
      </Buttons>
    </StyledPagination>
  );
};

export default Pagination;
