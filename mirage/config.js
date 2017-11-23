import ENV from 'bs-client/config/environment';

export default function() {
  this.urlPrefix = ENV.BACKEND_URL;
  this.urlPrefix = 'http://localhost:3000';
  this.namespace = '/api/v1';

  this.get('/users/me');

  this.post('/user_sessions.json', () =>  {
    return { errors: [] };
  });

  this.get('/rentals/rental_daily_rate_ranges', () => {
    return { rental_statistics: { max_daily_rate: 10, min_daily_rate: 1 } };
  });
}
