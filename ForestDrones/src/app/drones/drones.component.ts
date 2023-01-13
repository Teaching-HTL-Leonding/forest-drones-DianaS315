import { Component, OnInit } from '@angular/core';
import { DroneService, Drone, Position } from '../drone.service';

@Component({
  selector: 'app-drones',
  templateUrl: './drones.component.html',
  styleUrls: ['./drones.component.css'],
})
export class DronesComponent implements OnInit {
  public drones!: Drone[];
  public xDronePosition: number = 0;
  public yDronePosition: number = 0;
  public calledDroneId: number = 0;
  public loading: boolean = false;

  public xForesterPosition: number = 0;
  public yForesterPosition: number = 0;

  public damagedTrees!: Position[];

  constructor(public droneService: DroneService) {}

  ngOnInit(): void {
    this.loading = false;
    this.loadAllDrones();
  }

  public loadAllDrones() {
    this.droneService.loadAllDrones().subscribe((data) => (this.drones = data));
  }

  public activateDrone(droneId: number) {
    this.droneService.activateDrone(droneId);
    this.ngOnInit();
  }

  public shutdownDrone(droneId: number) {
    this.droneService.shutdownDrone(droneId);
    this.ngOnInit();
  }

  public changePosition(droneId: number) {
    const body: Position = {
      x: this.xDronePosition,
      y: this.yDronePosition,
    };

    this.droneService.changeDronePosition(droneId, body).subscribe(() => {
      this.loading = true;
      this.ngOnInit();
    });
    this.xDronePosition = 0;
    this.yDronePosition = 0;
  }

  public callDrone() {
    const body: Position = {
      x: this.xForesterPosition,
      y: this.yForesterPosition,
    };
    this.droneService
      .changeDronePosition(this.calledDroneId, body)
      .subscribe(() => {
        this.loading = true;
        this.ngOnInit;
      });
  }
}
