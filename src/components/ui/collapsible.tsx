import * as CollapsiblePrimitive from '@radix-ui/react-collapsible'

export function Collapsible(props: CollapsiblePrimitive.CollapsibleProps) {
  return <CollapsiblePrimitive.Collapsible {...props} />
}

export function CollapsibleTrigger(
  props: CollapsiblePrimitive.CollapsibleTriggerProps
) {
  return <CollapsiblePrimitive.CollapsibleTrigger {...props} />
}

export function CollapsibleContent(
  props: CollapsiblePrimitive.CollapsibleContentProps
) {
  return (
    <CollapsiblePrimitive.Content
      {...props}
      // className="fixed z-50 right-0 top-0 bottom-0 w-[400px] h-screen border-l border-zinc-900 bg-zinc-950 p-8"
    />
  )
}
