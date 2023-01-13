import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

export interface Root {
  drones: Drone[];
}

export interface Drone {
  id: number;
  isActive: boolean;
  position?: Position;
}

export interface Position {
  x: number;
  y: number;
}

export interface Scan {
  dronePosition: Position;
  damagedTrees: Position[];
}



@Injectable({
  providedIn: 'root',
})
export class DroneService {
  constructor(private http: HttpClient) {}

  public loadAllDrones(): Observable<Drone[]> {
    return this.http.get<Drone[]>('http://localhost:5110/drones');
  }

  public activateDrone(droneId: number) {
    this.http
      .post(`http://localhost:5110/drones/${droneId}/activate`, null)
      .subscribe();
  }

  public shutdownDrone(droneId: number) {
    this.http
      .post(`http://localhost:5110/drones/${droneId}/shutdown`, null)
      .subscribe();
  }

  public changeDronePosition(
    droneId: number,
    body: Position
  ): Observable<unknown> {
    return this.http.post(
      `http://localhost:5110/drones/${droneId}/flyTo`,
      body
    );
  }

  public scanTrees(droneId: number): Observable<Scan> {
    return this.http.get<Scan>(
      `http://localhost:5110/drones/${droneId}/scan`
    );
  }
}
