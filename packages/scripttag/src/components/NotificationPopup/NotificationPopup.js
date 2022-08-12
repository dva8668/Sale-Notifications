import React from 'react';
import './NoticationPopup.scss';
import truncateString from '../../helpers/truncateString';

const NotificationPopup = ({
  firstName = 'James',
  city = 'Los Angeles',
  country = 'United States',
  productName = 'Best Sell',
  relativeDate = '1 munite ago',
  productImage = 'https://cdn.shopify.com/s/files/1/0551/1187/6737/products/potted-seeds_925x_ccb1af66-c18a-4c4a-86f5-2f0184b2b3ab.jpg?v=1658896752',
  hideTimeAgo = false,
  truncateProductName = true,
  position = 'bottom-left',
  productUrl = '#'
}) => {
  const [cross, main] = position.split('-');

  return (
    <div
      className="Avava-SP__Wrapper fadeInUp animated"
      style={{[cross]: '15px', [main]: '15px'}}
    >
      <div className="Avava-SP__Inner">
        <div className="Avava-SP__Container">
          <a
            href={productUrl}
            className={'Avava-SP__LinkWrapper'}
            target="_blank"
          >
            <div
              className="Avava-SP__Image"
              style={{
                backgroundImage: `url(${productImage})`
              }}
            />
            <div className="Avada-SP__Content">
              <div className={'Avada-SP__Title'}>
                {firstName} in {city}, {country}
              </div>
              <div className={'Avada-SP__Subtitle'}>
                purchased{' '}
                {truncateProductName
                  ? truncateString(productName, 16)
                  : productName}
              </div>
              <div className={'Avada-SP__Footer'}>
                {hideTimeAgo ? ' ' : relativeDate}{' '}
                <span className="uni-blue">
                  <i className="fa fa-check" aria-hidden="true" /> by Avada
                </span>
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};

NotificationPopup.propTypes = {};

export default NotificationPopup;
