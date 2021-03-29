import visualizer from 'rollup-plugin-visualizer';

export function build(config) {
	if (process.env.analyze) {
		config.plugins.push(visualizer({
			open: true,
			gzipSize: true,
			brotliSize: true,
		}))
	}
}
