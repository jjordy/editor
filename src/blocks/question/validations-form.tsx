export default function Validationsform({ data, onDataChange }: any) {
  return (
    <div className="min-h-72">
      <div className="flex items-center">
        <label className="question-label" htmlFor="id_required">
          Required
        </label>
        <input
          type="checkbox"
          name="required"
          id="id_required"
          checked={data.required}
          className="w-4 h-4 ml-4"
          onChange={(evt: any) =>
            onDataChange({ required: evt.currentTarget.checked })
          }
        />
      </div>
    </div>
  );
}
