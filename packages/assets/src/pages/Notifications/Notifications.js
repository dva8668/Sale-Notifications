import React, {useState} from 'react';
import moment from 'moment';
import {
  Card,
  Layout,
  Page,
  ResourceList,
  ResourceItem,
  Stack,
  Pagination
} from '@shopify/polaris';
import * as PropTypes from 'prop-types';
import {connect} from 'react-redux';
import api from '../../helpers';
import {paginateSamples} from '../../actions/sample/paginateSample';
import NotificationPopup from '../../components/NotificationPopup';
import useFetchApi from '../../hooks/api/useFetchApi';

function Notifications() {
  const [selectedItems, setSelectedItems] = useState([]);
  const [sortValue, setSortValue] = useState('timestamp_Desc');
  const {data: settings} = useFetchApi('/settings');

  const {
    data: notifications,
    loading: fetchLoading,
    setData: setNotifications,
    setLoading
  } = useFetchApi('/notifications');

  async function onSelectionChangeValue(selected) {
    try {
      setLoading(true);
      const datas = await api('/notifications', 'GET', {}, {sort: selected});
      if (datas.success) {
        setNotifications(datas.data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Page
      fullWidth
      title="Notifications"
      subtitle="List of sale notifications from Shopify"
    >
      <Layout>
        <Layout.Section>
          <Card>
            <ResourceList
              loading={fetchLoading}
              resourceName={{
                singular: 'notification',
                plural: 'notifications'
              }}
              items={notifications}
              selectedItems={selectedItems}
              onSelectionChange={setSelectedItems}
              selectable
              sortOptions={[
                {label: 'Newest update', value: 'timestamp_Desc'},
                {label: 'Oldest update', value: 'timestamp_Asc'}
              ]}
              sortValue={sortValue}
              onSortChange={selected => {
                onSelectionChangeValue(selected);
                setSortValue(selected);
              }}
              renderItem={notification => {
                const {
                  id,
                  firstName,
                  city,
                  country,
                  productName,
                  timestamp,
                  productImage
                } = notification;
                const timed = moment(timestamp).fromNow();
                return (
                  <ResourceItem id={id} key={id}>
                    <Stack>
                      <Stack.Item fill>
                        <NotificationPopup
                          firstName={firstName}
                          city={city}
                          country={country}
                          productName={productName}
                          timestamp={timestamp}
                          productImage={productImage}
                          settings={settings}
                        />
                      </Stack.Item>
                      <Stack.Item>
                        <p>{timed}</p>
                      </Stack.Item>
                    </Stack>
                  </ResourceItem>
                );
              }}
            />
          </Card>
        </Layout.Section>
      </Layout>
      <div style={{padding: '10px'}}>
        <Pagination
          // hasPrevious
          previousTooltip="0"
          onPrevious={previousTooltip => {
            console.log(previousTooltip);
          }}
          // hasNext
          nextTooltip="2"
          onNext={nextTooltip => {
            console.log(nextTooltip);
          }}
        />
      </div>
    </Page>
  );
}

Notifications.propTypes = {
  paginateSamples: PropTypes.func.isRequired,
  sample: PropTypes.object.isRequired
};

const mapStateToProps = app => ({
  sample: app.sample
});

const mapStateToDispatch = {
  paginateSamples
};

export default connect(mapStateToProps, mapStateToDispatch)(Notifications);
