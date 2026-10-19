/** Renders one form control for an entity / content field definition. */
export default function Field({ field, value }) {
  const id = `f-${field.name}`;
  const v = value ?? field.default ?? '';

  if (field.type === 'checkbox') {
    return (
      <div className="adm-field adm-check wide">
        <input type="checkbox" id={id} name={field.name} defaultChecked={Boolean(Number(v))} />
        <label htmlFor={id}>{field.label}</label>
      </div>
    );
  }

  if (field.type === 'textarea') {
    return (
      <div className="adm-field wide">
        <label htmlFor={id}>{field.label}</label>
        <textarea id={id} name={field.name} defaultValue={v} required={field.required} />
      </div>
    );
  }

  if (field.type === 'image') {
    return (
      <div className="adm-field wide">
        <label htmlFor={id}>{field.label}</label>
        <div className="adm-image-row">
          {v ? <img src={v} alt="" /> : null}
          <div className="inputs">
            <input type="text" id={id} name={field.name} defaultValue={v} placeholder="/images/… or upload below" required={field.required} />
            <input type="file" name={`${field.name}__file`} accept="image/jpeg,image/png,image/webp,image/gif" />
            <span className="adm-hint">Upload a file (max 8 MB) to replace the path above.</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="adm-field">
      <label htmlFor={id}>{field.label}</label>
      <input
        type={field.type}
        id={id}
        name={field.name}
        defaultValue={v}
        required={field.required}
        placeholder={field.placeholder}
        step={field.step}
      />
    </div>
  );
}
