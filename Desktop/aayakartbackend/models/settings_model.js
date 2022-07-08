const mongoose = require("mongoose");

const settingsSchema = new mongoose.Schema({
  general: [
    {
      site_name: {
        type: String,
      },
      site_url: {
        type: String,
      },
      site_email: {
        type: String,
      },
      site_phone: {
        type: String,
      },
      site_address: {
        type: String,
      },
      site_logo: {
        type: String,
      },
      site_favicon: {
        type: String,
      },
      site_copyright: {
        type: String,
      },
      site_description: {
        type: String,
      },
      site_keywords: {
        type: String,
      },
      site_author: {
        type: String,
      },
      site_status: {
        type: String,
      },
      site_analytics: {
        type: String,
      },
      site_facebook: {
        type: String,
      },
      site_twitter: {
        type: String,
      },
      site_instagram: {
        type: String,
      },
      site_linkedin: {
        type: String,
      },
      site_youtube: {
        type: String,
      },
      site_google: {
        type: String,
      },
      site_pinterest: {
        type: String,
      },
      site_vimeo: {
        type: String,
      },
      site_tumblr: {
        type: String,
      },
      site_github: {
        type: String,
      },
      site_skype: {
        type: String,
      },
      site_dribbble: {
        type: String,
      },
      site_rss: {
        type: String,
      },
      site_google_plus: {
        type: String,
      },
      site_paypal: {
        type: String,
      },
      site_stripe: {
        type: String,
      },
      site_bitbucket: {
        type: String,
      },
      site_dropbox: {
        type: String,
      },
      site_flickr: {
        type: String,
      },
      site_vk: {
        type: String,
      },
      site_vine: {
        type: String,
      },
      site_soundcloud: {
        type: String,
      },
      site_spotify: {
        type: String,
      },
      site_lastfm: {
        type: String,
      },
      site_yelp: {
        type: String,
      },
    },
  ],
  smtp: [
    {
      host: {
        type: String,
      },
      port: {
        type: Number,
      },
      user: {
        type: String,
      },
      pass: {
        type: String,
      },
      secure: {
        type: Boolean,
      },
      from: {
        type: String,
      },
    },
  ],
  cors: [
    {
      url: {
        type: String,
      },
      access_key: {
        type: String,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  template: [
    {
      title: {
        type: String,
      },
      html: {
        type: String,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("settings", settingsSchema);
