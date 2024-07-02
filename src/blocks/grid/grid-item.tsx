import clsx from "clsx";
import GridEditor from "./grid-editor";

export default function GridItem({
  gap,
  columns,
  onContentsChange,
  onColumnWidthChange,
  gridContents,
}: any) {
  return (
    <div
      className={clsx(
        "grid w-full grid-cols-6",
        gap === 2 && "gap-2",
        gap === 3 && "gap-3",
        gap === 4 && "gap-4",
        gap === 8 && "gap-8",
        gap === 16 && "gap-16",
      )}
    >
      {Array(columns)
        .fill(null)
        .map((_, i) => (
          <div
            key={`grid_item_${i}`}
            className={clsx(
              !gridContents[i + 1]?.className && columns === 1 && "col-span-6",
              !gridContents[i + 1]?.className && columns === 2 && "col-span-3",
              !gridContents[i + 1]?.className && columns === 3 && "col-span-2",
              (!gridContents[i + 1]?.className && columns === 5) ||
                columns === 5 ||
                (columns === 6 && "col-span-1"),
              gridContents[i + 1]?.className,
            )}
          >
            <div className="question-field-group">
              <select
                id="id_column_width"
                name="column_width"
                className="question-input !rounded-b-none"
                value={gridContents[i + 1]?.className}
                onChange={(evt: any) =>
                  onColumnWidthChange({
                    column: i + 1,
                    className: evt.target.value,
                  })
                }
              >
                <option value="col-span-1">1/6</option>
                <option value="col-span-2">2/6</option>
                <option value="col-span-3">3/6</option>
                <option value="col-span-4">4/6</option>
                <option value="col-span-5">5/6</option>
                <option value="col-span-6">Full</option>
              </select>
            </div>
            <div
              className={clsx(
                "w-full border-b border-l border-r border-slate-300 rounded-b p-1",
              )}
            >
              <GridEditor
                data={gridContents[i + 1]?.content ?? { blocks: [] }}
                onChange={(v: unknown) =>
                  onContentsChange({ column: i + 1, content: v })
                }
              />
            </div>
          </div>
        ))}
    </div>
  );
}
