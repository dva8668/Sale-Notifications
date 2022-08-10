import {TextField, Select, Form, FormLayout, TextStyle} from '@shopify/polaris';
import React, {useCallback} from 'react';

export default function Trigger({input, handleChangeInput}) {
  const options = [
    {label: 'All Page', value: 'all'},
    {label: 'Specific Page', value: 'specific'}
  ];
  const handleSelectChange = useCallback(
    value => handleChangeInput('allowShow', value),
    []
  );

  const handleChangeIncludedUrls = useCallback(
    val => handleChangeInput('includedUrls', val),
    []
  );
  const handleChangeExcludedUrls = useCallback(
    val => handleChangeInput('excludedUrls', val),
    []
  );

  const handleSubmit = useCallback(_event => {}, []);

  return (
    <Form onSubmit={handleSubmit}>
      <FormLayout>
        <Select
          label={<TextStyle variation="strong">PAGE RESTRICTION</TextStyle>}
          options={options}
          onChange={handleSelectChange}
          value={input.allowShow}
        />
        {input.allowShow === 'specific' && (
          <TextField
            label="Included Pages"
            type="text"
            value={input.includedUrls}
            onChange={handleChangeIncludedUrls}
            helpText="Page URLs to show the pop-up (separated by new lines)"
            autoComplete="off"
            multiline={4}
          />
        )}
        {input.allowShow === 'all' && (
          <TextField
            label="Excluded Pages"
            type="text"
            value={input.excludedUrls}
            onChange={handleChangeExcludedUrls}
            helpText="Page URLs NOT to show the pop-up (separated by new lines)"
            autoComplete="off"
            multiline={4}
          />
        )}
      </FormLayout>
    </Form>
  );
}
