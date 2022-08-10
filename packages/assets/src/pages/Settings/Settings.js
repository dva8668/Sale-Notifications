import React, {useState, useCallback, useEffect} from 'react';
import {
  Page,
  Tabs,
  Card,
  Stack,
  SkeletonPage,
  Layout,
  SkeletonBodyText,
  TextContainer,
  SkeletonDisplayText
} from '@shopify/polaris';
import DisplaySetting from '../../components/DisplaySetting';
import Trigger from '../../components/Trigger';
import NotificationPopup from '../../components/NotificationPopup';
import api from '../../helpers';
import useFetchApi from '../../hooks/api/useFetchApi';
import {store} from '../..';
import {setToast} from '../../actions/layout/setToastAction';

export default function Settings() {
  const [loading, setLoading] = useState(false);

  const {data: input, setData: setInput, loading: fetchLoading} = useFetchApi(
    '/settings'
  );
  console.log(input);
  const [selected, setSelected] = useState(0);
  const handleTabChange = useCallback(
    selectedTabIndex => setSelected(selectedTabIndex),
    []
  );

  const handleChangeInput = (key, value) => {
    setInput(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const tabs = [
    {
      id: 'display',
      content: 'Display',
      children: (
        <DisplaySetting input={input} handleChangeInput={handleChangeInput} />
      )
    },
    {
      id: 'trigger',
      content: 'Trigger',
      children: <Trigger input={input} handleChangeInput={handleChangeInput} />
    }
  ];

  async function updateSettings() {
    try {
      setLoading(true);
      const data = await api('/settings', 'PUT', input);

      store.dispatch(
        setToast({
          content: 'Save successfully updated'
        })
      );
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Page
      fullWidth
      title="Settings"
      subtitle="Decide how your notifications will display"
      loading={fetchLoading}
      primaryAction={{
        content: 'Save',
        onAction: updateSettings,
        loading: loading
      }}
    >
      {/* wrap = false */}
      <Stack>
        <Stack.Item>
          <NotificationPopup
            firstName="Viet Anh"
            city="California"
            country="United States"
            productName="Copper Light Copper Light Copper Light"
            productImage="https://cdn.shopify.com/s/files/1/0622/5153/2466/products/potted-seeds_925x_921cd51a-61a8-46de-b4db-31322b9a6b48.jpg?v=1658908329"
            timestamp={new Date()}
            settings={input}
          />
        </Stack.Item>
        <Stack.Item fill>
          {fetchLoading ? (
            <SkeletonPage primaryAction>
              <Layout>
                <Layout.Section>
                  <Card sectioned>
                    <TextContainer>
                      <SkeletonDisplayText size="extraLarge" />
                      <SkeletonBodyText lines={2} />
                      <SkeletonBodyText />
                    </TextContainer>
                  </Card>
                  <Card sectioned>
                    <TextContainer>
                      <SkeletonDisplayText size="small" />
                      <SkeletonBodyText />
                    </TextContainer>
                  </Card>
                </Layout.Section>
              </Layout>
            </SkeletonPage>
          ) : (
            <Card>
              <Tabs tabs={tabs} selected={selected} onSelect={handleTabChange}>
                <Card.Section>{tabs[selected].children}</Card.Section>
              </Tabs>
            </Card>
          )}
        </Stack.Item>
      </Stack>
    </Page>
  );
}
