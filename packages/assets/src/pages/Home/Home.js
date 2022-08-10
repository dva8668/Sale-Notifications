import React, { useState, useCallback , useEffect} from 'react';
import { SettingToggle, TextStyle, Page } from "@shopify/polaris";
import api from '../../helpers';

/**
 * Render a home page for overview
 *
 * @return {React.ReactElement}
 * @constructor
 */
export default function Home() {

  // async function callApi() {
  //   await api('/scripttag', "POST");
  // }

  // useEffect(() => {
  //   callApi();
  // }, []);

  const [active, setActive] = useState(false);

  const handleToggle = useCallback(() => setActive((active) => !active), []);

  const contentStatus = active ? "Disable" : "Enable";
  const textStatus = active ? "enable" : "disable";
  return (
    <Page
      fullWidth
      title="Home"
    >
          <SettingToggle
      action={{
        content: contentStatus,
        onAction: handleToggle
      }}
      enabled={active}
    >
      This setting is <TextStyle variation="strong">{textStatus}</TextStyle>.
    </SettingToggle>
    </Page>
  );
}
