import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Drone, DroneService, Position } from 'src/app/drone.service';

@Component({
  selector: 'app-examine-trees',
  templateUrl: './examine-trees.component.html',
  styleUrls: ['./examine-trees.component.css'],
})
export class ExamineTreesComponent implements OnInit {
  public damagedTrees!: Position[];
  public droneId: string = '';
  public xPosition: String = '';
  public yPosition: String = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    public droneService: DroneService
  ) {}

  ngOnInit(): void {
    this.droneId = this.activatedRoute.snapshot.params['id'];
    this.xPosition = this.activatedRoute.snapshot.params['xPos'];
    this.yPosition = this.activatedRoute.snapshot.params['yPos'];

    this.scanForest();
  }

  public scanForest() {
    this.droneService
      .scanTrees(parseInt(this.droneId, 10))
      .subscribe((data) => (this.damagedTrees = data.damagedTrees));
  }

  public shutdownDrone() {
    this.droneService.shutdownDrone(parseInt(this.droneId, 10));
  }

  public findNearestTree(){

  }
}
