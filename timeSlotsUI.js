      
      //this.timeSlots gives range of times ['07:00 am', '08:00 am', '09:00 am', '10:00 am', '11:00 am', '12:00 pm', '01:00 pm']
      this.times = this.timeSlots;

      //this.times has not value then this if execute not for single date
      if (!this.times) {
        return;
      }
      
      this.toTimes = this.times.slice(1).map((a, i) => [this.times[i], a]);
      
      /*
      this.toTimes will gets
      0: (2) ['07:00 am', '08:00 am', __ob__: Observer]
      1: (2) ['08:00 am', '09:00 am', __ob__: Observer]
      2: (2) ['09:00 am', '10:00 am', __ob__: Observer]
      3: (2) ['10:00 am', '11:00 am', __ob__: Observer]
      4: (2) ['11:00 am', '12:00 pm', __ob__: Observer]
      5: (2) ['12:00 pm', '01:00 pm'
      */

      this.toTimes = this.toTimes.flat();
      
      //convers the am to 24 hours [7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13]
      this.toTimes = this.toTimes.map((t) => {
        return +moment(t, ["h:mm A"]).format("HH:mm").split(":")[0];
      });

      this.toTimes.sort((a, b) => {
        return a - b;
      });

      this.toTimes = [...new Set(this.toTimes)];

      //make a pair of time slots
      // run every time if a hour slot is unblock add value accordingly
      this.toTimes = this.toTimes
        .map((a, i) => {
          return this.toTimes[i] + 1 === a
            ? [this.toTimes[i], a]
            : [this.toTimes[i], a + 1];
        })
        .flat();
      

      //conver am hour format
      this.toTimes = this.toTimes
        .map((t) => {
          return `${t}:00`;
        })
        .map((t) => {
          return moment(t, "HH:mm").format("hh:mm a");
        });

      //this is responsibe for (-) dash b/w times
      const timeWithDash = [];

      this.toTimes = this.toTimes.flat();

      for (let i = 0; i < this.toTimes.length; i++) {
        if (i % 2 === 0) {
          timeWithDash.push(this.toTimes[i] + " -");
        } else {
          timeWithDash.push(this.toTimes[i]);
        }
      }

      this.toTimes = arrayChunk(timeWithDash, 2); //arrayChunk is a npm module
