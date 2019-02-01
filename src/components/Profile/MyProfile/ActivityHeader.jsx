import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import networkArray from '../../../utils/networkArray';
import '../../styles/Feed.css';
import '../../../views/styles/Profile.css';
import '../../styles/NetworkArray.css';

const Activity = ({ name, image, feedAddress }) => (
  <div className="feed__activity__context">
    {(Object.keys(feedAddress)[0] === 'threeBox')
      && (image.length > 0 && image[0].contentUrl
        ? (
          <div className="feed__activity__userWrapper">
            <img
              src={`https://ipfs.infura.io/ipfs/${image[0].contentUrl['/']}`}
              className="feed__activity__user clear"
              alt="profile"
            />
            <h5 className="feed__activity__threeBoxEmblem">
              3
            </h5>
          </div>
        )
        : <h4 className="feed__activity__user">3B</h4>)
    }
    {Object.keys(feedAddress)[0] !== 'threeBox'
      && (
        <div className={`feed__activity__context__network ${networkArray[Math.floor(Math.random() * networkArray.length)]}`}>
          0x
        </div>)
    }
    <div className="feed__activity__address">
      {Object.keys(feedAddress)[0] === 'threeBox'
        ? (
          <div className="feed__activity__address__wrapper">
            <h4>
              {name}
            </h4>
            <p className="feed__activity__address__type">
              3Box Profile
            </p>
          </div>
        )
        : (
          <React.Fragment>
            {(feedAddress.metaData && feedAddress.metaData.name)
              && (
                <div className="feed__activity__address__wrapper">
                  <a href={`https://3box.io/${Object.keys(feedAddress)[0]}`}>
                    <h4>
                      {feedAddress.metaData.name}
                    </h4>
                  </a>
                  <p className="feed__activity__address__type">
                    Address
                  </p>
                </div>
              )}
            {(feedAddress.metaData && feedAddress.metaData.contractDetails && feedAddress.metaData.contractDetails.name)
              && (
                <div className="feed__activity__address__wrapper">
                  <a href={`https://etherscan.io/tx/${Object.keys(feedAddress)[0]}`} target="_blank" rel="noopener noreferrer">
                    <h4>
                      {(feedAddress.metaData.contractDetails.name.charAt(0).toUpperCase() + feedAddress.metaData.contractDetails.name.slice(1)).replace(/([A-Z])/g, ' $1').trim()}
                    </h4>
                  </a>
                  <p className="feed__activity__address__type">
                    Contract
                    {` ${Object.keys(feedAddress)[0].substring(0, 12)}...`}
                  </p>
                </div>
              )}
            {(!feedAddress.metaData || (!feedAddress.metaData.contractDetails && !feedAddress.metaData.name))
              && (
                <div className="feed__activity__address__wrapper">
                  <a href={`https://ethstats.io/account/${Object.keys(feedAddress)[0]}`} target="_blank" rel="noopener noreferrer">
                    <h4>
                      {Object.keys(feedAddress)[0]}
                    </h4>
                  </a>
                  <p className="feed__activity__address__type">
                    Address
                  </p>
                </div>
              )}
          </React.Fragment>
        )}
    </div>
  </div>
);

Activity.propTypes = {
  feedAddress: PropTypes.object,
  name: PropTypes.string,
  image: PropTypes.array,
};

Activity.defaultProps = {
  feedAddress: {},
  image: [],
  name: '',
};

const mapState = state => ({
  name: state.threeBox.name,
  image: state.threeBox.image,
});

export default connect(mapState)(Activity);
