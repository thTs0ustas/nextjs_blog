const { PHASE_PRODUCTION_SERVER } = require('next/constants');

/** @type {import('next').NextConfig} */
const nextConfig = phase => {
  if (phase === PHASE_PRODUCTION_SERVER) {
    return {
      reactStrictMode: true,
      env: {
        mongodb_username: 'thTs0ustas',
        mongodb_password: 'LHcXjFW2wYsbgVx',
        mongodb_cluster: 'cluster0',
        mongodb_db: 'test',
      },
    };
  }
  return {
    reactStrictMode: true,
    env: {
      mongodb_username: 'thTs0ustas',
      mongodb_password: 'LHcXjFW2wYsbgVx',
      mongodb_cluster: 'cluster0',
      mongodb_db: 'test',
    },
  };
};

module.exports = nextConfig;
