import { Box, Typography } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import React from "react";
import { Message } from "./Components/Message";
import { RadarTrapMap } from "./Components/RadarTrapMap";
import { VisRadarMapSelect } from "./Components/VisRadarMapSelect";
import { VisTraps } from "./Components/VisTraps";
import visTrapsDefault from "./Components/visTrapsDefault";
import Generic from "./Generic";

const mapStyles = [
	"satellite-v9",
	"satellite-streets-v11",
	"streets-v11",
	"streets-v12",
	"light-v10",
	"dark-v10",
	"outdoors-v11",
	"traffic-day-v2",
	"traffic-night-v2",
];

class RadarTrapAreaWidget extends Generic {
	constructor(props) {
		super(props);

		this.language = this.props.context.systemConfig.common.language;
	}

	static getWidgetInfo() {
		return {
			id: "tplRadarTrapAreaWidget",
			visSet: "vis-2-widgets-radar-trap",
			visSetLabel: "set_label", // Widget set translated label (should be defined only in one widget of set)
			visSetColor: "#4169E1", // Color of widget set. it is enough to set color only in one widget of set
			visName: "area", // Name of widget
			visWidgetLabel: "area",
			visAttrs: [
				{
					name: "common", // group name
					fields: [
						{
							name: "noCard",
							label: "without_card",
							type: "checkbox",
						},
						{
							name: "fitButton",
							label: "fit_button",
							type: "checkbox",
							default: true,
						},
						{
							name: "refreshButton",
							label: "refresh_button",
							type: "checkbox",
							default: true,
						},
						{
							name: "oid",
							label: "title",
							type: "id",
							noInit: true,
							filter: { common: { type: "string" } },
						},
						{
							name: "areaId",
							label: "area_id",
							default: "",
							type: "custom", // important
							component: (
								// important
								field, // field properties: {name, label, type, set, singleName, component,...}
								data, // widget data
								onDataChange, // function to call, when data changed
								props, // additional properties : {socket, projectName, instance, adapterName, selectedView, selectedWidgets, project, widgetID}
								// widgetID: widget ID or widgets IDs. If selecteld more than one widget, it is array of IDs
								// project object: {VIEWS..., [view]: {widgets: {[widgetID]: {tpl, data, style}}, settings, parentId, rerender, filterList, activeWidgets}, ___settings: {}}
							) => (
								<VisRadarMapSelect
									type="area"
									visSocket={props.context.socket}
									fieldName={field.name}
									fieldValue={data[field.name] || field.default}
									onDataChange={onDataChange}
								/>
							),
						},
						{
							name: "styleSelect",
							label: "style_select",
							type: "select",
							default: "streets-v12",
							options: mapStyles,
						},
						{
							name: "showCluster",
							label: "show_cluster",
							type: "checkbox",
							default: true,
						},
						{
							name: "showPolygon",
							label: "show_polygon",
							type: "checkbox",
							default: true,
						},
						{
							name: "polygonBorder",
							label: "polygon_border",
							type: "slider",
							default: 4,
							min: 0,
							max: 20,
							step: 0.5,
						},
						{
							name: "polygonColor",
							label: "polygon_color",
							type: "color",
							default: "rgba(10,138,232,0.15)",
						},
						{
							name: "polygonBorderColor",
							label: "polygon_border_color",
							type: "color",
							default: "rgba(61,156,226,0.6)",
						},
						{
							name: "clusterColor",
							label: "cluster_color",
							type: "color",
							default: "rgba(197,14,228,0.4)",
						},
						{
							name: "clusterTextColor",
							label: "cluster_text_color",
							type: "color",
							default: "rgba(52,27,57,0.95)",
						},
						{
							name: "symbolColor",
							label: "symbol_color",
							type: "color",
							default: "rgba(13,77,133,0.8)",
						},
						{
							name: "symbolTextColor",
							label: "symbol_text_color",
							type: "color",
							default: "rgba(10,34,55,0.95)",
						},
						{
							name: "symbolNewColor",
							label: "symbol_new_color",
							type: "color",
							default: "rgba(232,10,10,0.7)",
						},
						{
							name: "symbolTextNewColor",
							label: "symbol_text_new_color",
							type: "color",
							default: "rgba(123,25,25,0.95)",
						},
					],
				},
				{
					name: "traps",
					label: "group_traps",
					fields: [
						{
							name: "onlyNewTraps",
							label: "only_new_traps",
							type: "checkbox",
							noBinding: true,
							default: false,
						},
						{
							name: "closedCongestedRoad",
							label: "closed_congested_road",
							type: "checkbox",
							noBinding: true,
							default: true,
						},
						{
							name: "animateClosedCongestedRoad",
							label: "animate_closed_congested_road",
							type: "checkbox",
							noBinding: true,
							default: false,
						},
						{
							name: "visTraps",
							// label: 'vis_traps',
							label: "group_traps",
							noBinding: true,
							default: visTrapsDefault,
							type: "custom", // important
							component: (
								// important
								field, // field properties: {name, label, type, set, singleName, component,...}
								data, // widget data
								onDataChange, // function to call, when data changed
								// props,       // additional properties : {socket, projectName, instance, adapterName, selectedView, selectedWidgets, project, widgetID}
								// widgetID: widget ID or widgets IDs. If selecteld more than one widget, it is array of IDs
								// project object: {VIEWS..., [view]: {widgets: {[widgetID]: {tpl, data, style}}, settings, parentId, rerender, filterList, activeWidgets}, ___settings: {}}
							) => (
								<VisTraps
									fieldName={field.name}
									fieldValue={data[field.name] || field.default}
									onDataChange={onDataChange}
								/>
							),
						},
					],
				},
				// check here all possible types https://github.com/ioBroker/ioBroker.vis/blob/react/src/src/Attributes/Widget/SCHEMA.md
			],
			visDefaultStyle: {
				width: "100%",
				height: 200,
				position: "relative",
			},
			visPrev: "widgets/vis-2-widgets-radar-trap/img/prev-area-widget.png",
		};
	}

	// eslint-disable-next-line class-methods-use-this
	propertiesUpdate() {
		// Widget has 3 important states
		// 1. this.state.values - contains all state values, that are used in widget (automatically collected from widget info).
		//                        So you can use `this.state.values[this.state.rxData.oid + '.val']` to get value of state with id this.state.rxData.oid
		// 2. this.state.rxData - contains all widget data with replaced bindings. E.g. if this.state.data.type is `{system.adapter.admin.0.alive}`,
		//                        then this.state.rxData.type will have state value of `system.adapter.admin.0.alive`
		// 3. this.state.rxStyle - contains all widget styles with replaced bindings. E.g. if this.state.styles.width is `{javascript.0.width}px`,
		//                        then this.state.rxData.type will have state value of `javascript.0.width` + 'px
	}

	/* componentWillUnmount() {
        super.componentWillUnmount();
    } */

	componentDidMount() {
		super.componentDidMount();
		// Update data
		this.propertiesUpdate();
	}

	// Do not delete this method. It is used by vis to read the widget configuration.
	// eslint-disable-next-line class-methods-use-this
	getWidgetInfo() {
		return RadarTrapAreaWidget.getWidgetInfo();
	}

	// This function is called every time when rxData is changed
	onRxDataChanged() {
		this.propertiesUpdate();
	}

	// This function is called every time when rxStyle is changed
	// eslint-disable-next-line class-methods-use-this
	onRxStyleChanged() {}

	// This function is called every time when some Object State updated, but all changes lands into this.state.values too
	// eslint-disable-next-line class-methods-use-this, no-unused-vars
	onStateUpdated(id, state) {}

	renderWidgetBody(props) {
		super.renderWidgetBody(props);

		const content = this.state.radarTrapEnabled ? (
			<ThemeProvider theme={this.props.context.theme}>
				<RadarTrapMap
					type="area"
					feathersClient={this.state.feathersClient}
					routeOrAreaId={this.state.rxData.areaId || null}
					settings={this.state.settings}
					editMode={this.props.editMode}
					socket={this.props.context.socket}
					instanceId={this.instanceId}
					data={this.state.rxData}
					style={this.state.rxStyle}
					width={this.state.rxStyle.width}
					height={this.state.rxStyle.height}
				/>
			</ThemeProvider>
		) : (
			<Message
				message={`${Generic.t("For the configuration the radar-trap instance must be started")}`}
			/>
		);

		const value = this.getValue();
		const contentHeader =
			this.state.radarTrapEnabled && value ? (
				<Box
					sx={{
						width: "100%",
						textAlign: this.state.rxStyle["text-align"]
							? this.state.rxStyle["text-align"]
							: "center",
					}}
				>
					<Typography
						variant="h6"
						component="h5"
						sx={{
							pb: 1,
							fontFamily: this.state.rxStyle["font-family"],
							fontWeight: this.state.rxStyle["font-weight"]
								? this.state.rxStyle["font-weight"]
								: "bold",
							fontSize: this.state.rxStyle["font-size"]
								? this.state.rxStyle["font-size"]
								: "large",
							lineHeight: this.state.rxStyle["line-height"],
							letterSpacing: this.state.rxStyle["letter-spacing"],
							wordSpacing: this.state.rxStyle["word-spacing"],
						}}
					>
						{value}
					</Typography>
				</Box>
			) : null;

		if (this.state.rxData.noCard || props.widget.usedInWidget) return content;

		return this.wrapContent(
			content,
			// null,
			contentHeader,
			{
				height: "100%",
				width: "100%",
				padding: 10,
				boxSizing: "border-box",
			},
		);
	}
}

export default RadarTrapAreaWidget;
