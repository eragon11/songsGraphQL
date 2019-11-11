const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SongSchema = new Schema({
  title: { type: String },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  lyrics: [{
    type: Schema.Types.ObjectId,
    ref: 'lyric'
  }]
}, {
    usePushEach: true
  });

SongSchema.statics.addLyric = function (id, content) {
  const Lyric = mongoose.model('lyric');
  console.log(id, content);
  return this.findById(id)
    .then(song => {
      console.log(song)
      let songId = song._id;
      const lyric = new Lyric({ content, songId })
      song.lyrics.push(lyric)
      return Promise.all([lyric.save(), song.save()])
        .then(([lyric, song]) => song);
    });
}

SongSchema.statics.findLyrics = function (id) {
  return this.findById(id)
    .populate('lyrics')
    .then(song => song.lyrics);
}

mongoose.model('song', SongSchema);
