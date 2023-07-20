<template>
  <GmapMap ref="mapRef"
           @click="closeInfoWindow"
           :center="center"
           :zoom="15"
           class="map"
           :options="{
             mapTypeControl: false,
             scaleControl: true,
             streetViewControl: true,
             fullscreenControl: true,
             disableDefaultUI: true,
             scrollwheel: true,
             clickableIcons: true,
           }">
    <GmapMarker :position="marker.position"
                :clickable="true"
                @click="openInfoWindow(marker)"
                :draggable="markerDraggable"
                @drag="updateInfoWindowPosition"
                @dragend="updatePositions" />
    <GmapInfoWindow :position="infoWindow.position"
                    :opened="infoWindow.opened"
                    @closeclick="infoWindow.opened = false">
      <div class="infoWindow">{{ infoWindow.content }}</div>
    </GmapInfoWindow>
  </GmapMap>
</template>



<script>
export default {
  name: "Map",
  props: {
    center: {
      type: Object,
      default: () => ({ lat: 25.033671, lng: 121.564427 }),
    },
    initialMarker: {
      type: Object,
      default: () => ({ position: { lat: 25.033671, lng: 121.564427 } }),
    },
    initialInfoWindow: {
      type: Object,
      default: () => ({
        opened: false,
        position: null,
        content: "My photo location!",
      }),
    },
    markerDraggable: {
      type: Boolean,
      default: true,
    }
  },
  data() {
    return {
      marker: this.initialMarker,
      infoWindow: this.initialInfoWindow
    };
  },
  watch: {
    // Monitor changes in 'center' to update 'marker.position'
    center: {
      deep: true,
      handler(newVal) {
        this.marker.position = newVal; // Update marker position to new center
      }
    },
    // Monitor changes in 'marker.position' when marker is dragged 
    // The props of GmapMap and GmapMarker update independently, which can cause inconsistencies between their latitudes. To solve this, we sync the marker's position with the center's changes.
    marker: {
      deep: true,
      handler() {
        this.$emit("markerDragged", this.marker.position); // Emit updated position to the parent component
      }
    }
  },
  methods: {
    // Update the positions of marker and center when the marker is dragged
    updatePositions(event) {
      const newPosition = {
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
      };

      this.marker.position = newPosition;
      this.$refs.mapRef.panTo(newPosition);
    },
    // Open the InfoWindow when the marker is clicked
    openInfoWindow(marker) {
      let pos = { ...marker.position };
      pos.lat = pos.lat + 0.0015;
      this.infoWindow = {
        ...this.infoWindow,
        position: pos,
        opened: true,
      };
    },
    // Close the InfoWindow when a location other than the marker is clicked.
    closeInfoWindow() {
      if (this.infoWindow.opened) {
        this.infoWindow.opened = false;
      }
    },
    // Update the InfoWindow position while the marker is being dragging
    updateInfoWindowPosition(event) {
      if (this.infoWindow.opened) {
        this.infoWindow.position = { lat: event.latLng.lat() + 0.0015, lng: event.latLng.lng() };
      }
    },
  },
}
</script>



<style lang="scss" scoped>
.map {
  width: 100%;
  height: 450px;
}

.infoWindow {
  width: 130px;
  height: auto;
  font-weight: bold;
}
</style>