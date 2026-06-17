import { Fragment } from "react";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";

type Props = {
  currentPage: number;
  pageCount: number;

  buildHref: (page: number) => string;
  className?: string;
};

const getPageNumbers = (currentPage: number, pageCount: number) => {
  const pages = new Set<number>([1, pageCount, currentPage, currentPage - 1, currentPage + 1]);

  return Array.from(pages)
    .filter((page) => page >= 1 && page <= pageCount)
    .sort((a, b) => a - b);
};

const ProductsPagination = ({ currentPage, pageCount, buildHref, className }: Props) => {
  if (pageCount <= 1) return null;

  const pages = getPageNumbers(currentPage, pageCount);

  return (
    <Pagination className={cn(className)} aria-label="Phân trang">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href={buildHref(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
          />
        </PaginationItem>

        {pages.map((page, index) => {
          const prevPage = pages[index - 1];
          const showEllipsis = prevPage !== undefined && page - prevPage > 1;

          return (
            <Fragment key={page}>
              {showEllipsis && (
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
              )}
              <PaginationItem>
                <PaginationLink href={buildHref(page)} isActive={page === currentPage}>
                  {page}
                </PaginationLink>
              </PaginationItem>
            </Fragment>
          );
        })}

        <PaginationItem>
          <PaginationNext
            href={buildHref(Math.min(pageCount, currentPage + 1))}
            disabled={currentPage === pageCount}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default ProductsPagination;
