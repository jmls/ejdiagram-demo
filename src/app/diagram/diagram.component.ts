import { Component, AfterViewInit, Injector } from '@angular/core';

@Component({
    templateUrl: './diagram.component.html'
})
export class DiagramComponent implements AfterViewInit {
    public nodes: any[] = [];

    private diagram: any;

    public Constraints: any = {};

    private Ports: any = {
        in: {
            name: 'in',
            offset: {
                x: 0.5,
                y: 0
            },
            shape: 'square',
            visibility: ej.datavisualization.Diagram.PortVisibility.Visible,
            size: 16,
            connectorPadding: 10,
            fillColor: '#b2ff59'
        },

        out: {
            name: 'out',
            offset: {
                x: 1,
                y: 0.5
            },
            shape: 'circle',
            size: 16,
            connectorPadding: 10,
            visibility: ej.datavisualization.Diagram.PortVisibility.Visible,
            constraints:
                ej.datavisualization.Diagram.PortConstraints.Connect |
                ej.datavisualization.Diagram.PortConstraints.ConnectOnDrag,
            fillColor: '#ffb74d'
        }
    };

    private baseNodes: any = {
        start: {
            type: 'basic',
            name: 'start',
            shape: 'ellipse',
            width: 50,
            height: 50,
            offsetX: 45,
            offsetY: 45,
            fillColor: '#428bca',
            borderColor: 'black',
            labels: [
                {
                    text: 'start',
                    fontColor: 'white',
                    textAlign: 'center'
                }
            ],
            ports: [{ ...this.Ports.out }],
            constraints: this.Constraints.nodeReadonly
        },

        close: {
            name: 'close',
            type: 'basic',
            shape: 'ellipse',
            width: 50,
            height: 50,
            offsetX: 305,
            offsetY: 205,
            borderColor: 'black',
            fillColor: '#e0e0e0',
            labels: [
                {
                    text: 'close',
                    fontColor: 'black',
                    textAlign: 'center'
                }
            ],
            ports: [{ ...this.Ports.in }],
            constraints: this.Constraints.nodeReadonly
        },

        stage: {
            type: 'flow',
            shape: 'process',
            width: 150,
            height: 50,
            offsetX: 175,
            fillColor: '#ff8a65',
            offsetY: 125,
            constraints: this.Constraints.node,
            labels: [{ text: '' }],
            ports: [{ ...this.Ports.in }, { ...this.Ports.out }]
        }
    };

    constructor(private _inject: Injector) {
        this.Constraints.node =
            (ej.datavisualization.Diagram.NodeConstraints.Default |
                ej.datavisualization.Diagram.NodeConstraints.Shadow) &
            ~ej.datavisualization.Diagram.NodeConstraints.Rotate;
        this.Constraints.nodeReadonly =
            this.Constraints.node &
            ~ej.datavisualization.Diagram.NodeConstraints.Delete;

        this.Constraints.connector =
            (ej.datavisualization.Diagram.ConnectorConstraints.Select |
                ej.datavisualization.Diagram.ConnectorConstraints.Delete |
                ej.datavisualization.Diagram.ConnectorConstraints
                    .PointerEvents |
                ej.datavisualization.Diagram.ConnectorConstraints.Bridging |
                ej.datavisualization.Diagram.ConnectorConstraints
                    .DragSegmentThumb) &
            ~ej.datavisualization.Diagram.ConnectorConstraints.Drag;

        this.Constraints.diagram =
            ej.datavisualization.Diagram.DiagramConstraints.Default |
            ej.datavisualization.Diagram.DiagramConstraints.Bridging;

        let nodes = [];

        this.addNode('start');
        this.addNode('stage');
        this.addNode('close');
    }

    public ngInit() {}

    private addNode(type: string) {
        this.nodes.push({ ...this.baseNodes[type] });
    }

    public ngAfterViewInit() {
        this.diagram = $('#graph').ejDiagram('instance');
    }
}
