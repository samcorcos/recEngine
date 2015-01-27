recEngine = {}

Edge = (source, sink, capacity) ->
  @source = source
  @sink = sink
  @capacity = capacity
  @reverseEdge = null
  @flow = 0

FlowNetwork = () ->
  @edges = {}

  @findEdgeInPath = (path, edge, residual) ->
    p = 0
    while p < path.length
      return true if path[p][0] is edge and path[p][1] is residual
      p++
    false

  @addEdge = (source, sink, capacity) ->
    return if source is sink

    edge = new Edge(source, sink, capacity)
    reverseEdge = new Edge(sink, source, 0)

    edge.reverseEdge = reverseEdge
    reverseEdge.reverseEdge = edge

    @edges[source] = [] if @edges[source] is undefined
    @edges[sink] = [] if @edges[sink] is undefined

    @edges[source].push(edge)
    @edges[sink].push(reverseEdge)
    return

  @findPath = (source, sink, path) ->
    return path if source is sink
    i = 0
    while i < @edges[source].length
      edge = @edge[source][i]
      residual = edge.capacity - edge.flow

      if residual > 0 and not @findEdgeInPath(path, edge, residual)
        tpath = path.slice(0)
        tpath.push [edge, residual]
        result = @findPath(edge.sink, sink, tpath)
        return result if result?
      i++
    null

  # this is the equivalent of "suggest", as it finds the max flow for each
  @maxFlow = (source, sink) ->
    path = @findPath(source, sink, [])
    while path?
      flow = 99999999999
      i = 0
      while i < path.length
        flow = path[i][1] if path[i][1] <flow
        i++

      i = 0
      while i < path.length
        path[i][0].flow += flow
        path[i][0].reverseEdge.flow -= flow
        i++

      path = @findPath(source, sink, [])

    sum = 0
    i = 0
    while i < @edges[source].length
      sum += @edges[source][i].flow
      i++
    sum



# recEngine.upvote = (user, item) ->
#
#
# var fn = new FlowNetwork();

# var max = fn.maxFlow('s','t');

fn = new FlowNetwork()

fn.addEdge('s','o',3)
fn.addEdge('s','p',3)
fn.addEdge('o','p',2)
fn.addEdge('o','q',3)
fn.addEdge('p','r',2)
fn.addEdge('r','t',3)
fn.addEdge('q','r',4)
fn.addEdge('q','t',2)

max = fn.maxFlow("s", "t")
console.log max
